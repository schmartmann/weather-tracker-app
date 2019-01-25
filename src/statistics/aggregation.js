import { validateParams } from './validators';
import { HttpError } from '../errors';

export class Aggregation {
  constructor( measurements, metrics, stats ) {
    this.measurements = measurements;
    this.metrics = metrics;
    this.stats = stats;
    this.aggregation = [];
  };

  buildAggregation() {
    var queryParamsAreValid = validateParams(
      this.measurements,
      this.metrics,
      this.stats
    );

    if ( queryParamsAreValid ) {
      this._groupMeasurementDataByMetric();

      this._groupStatsWithData();

      return this.aggregation;
    }
    else {
      throw new HttpError( 400 );
    }
  };


  _groupMeasurementDataByMetric() {
    var data = {};

    this.metrics.forEach(
      ( metric ) => {
        data[ metric ] = this._getMetricFromMeasurements( metric );
      }
    );

    this.metrics = data;
  };

  _getMetricFromMeasurements( metric ) {
    var metricsFromMeasurements = [];

    this.measurements.forEach(
      ( measurement ) => {
        var metricIsValid = this._validateMetric( measurement, metric )

        if ( !metricIsValid ) { return; };

        var metricFromMeasurements = measurement.getMetric( metric );

        metricsFromMeasurements.push( metricFromMeasurements );
      }
    );

    // sort the arrays to make calcs easier
    return metricsFromMeasurements.sort();
  };

  _validateMetric( measurement, metric ) {
    return measurement.getMetric( metric );
  };

  _groupStatsWithData() {
    var groupedStat = [];

    Object.
      keys( this.metrics ).
      map(
        ( key ) => {
          if ( this._detectEmptyMetric( key ) ) { return; }

          var result = this._mapStatsToData( key );

          groupedStat.push( result );
        }
      );

    this.aggregation = this._mergeStats( groupedStat );
  };

  _detectEmptyMetric( key ) {
    return this.metrics[ key ].length === 0;
  };

  _mapStatsToData( key ) {
    var mappedStat = [];

    this.stats.map(
      ( stat ) => {
        var metricData = this.metrics[ key ];

        var value = this._calculateStatistic( stat, metricData );

        var result = {
          metric: key,
          stat: stat,
          value: value
        };

        mappedStat.push( result );
      }
    );

    return mappedStat;
  };

  _calculateStatistic( stat, metricData ) {
    if ( stat === 'min' ) {
      return getMin( metricData );
    }

    else if ( stat === 'average' ) {
      return getAvg( metricData );
    }

    else if ( stat === 'max' ) {
      return getMax( metricData );
    }
  };

  _mergeStats( array ) {
    if ( array.length ) {
      return array.reduce(
        ( arrayOne, arrayTwo ) => arrayOne.concat( arrayTwo )
      );
    }
    else {
      return [];
    }
  };
};

const getMin = ( data ) => roundedFloat( data[ 0 ] );

const getMax = ( data ) => roundedFloat( data[ data.length - 1 ] );

const getAvg = ( data ) => {
  var sum;
  var average;

  if ( data.length > 0 ) {
    sum = data.reduce( ( itemOne, itemTwo ) => itemOne + itemTwo );
    average = sum / data.length

    return roundedFloat( average );
  }
};

const roundedFloat = ( data ) => parseFloat( data.toFixed( 1 ) );
