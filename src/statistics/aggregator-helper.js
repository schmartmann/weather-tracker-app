export const pairMetricWithData = ( measurements, metrics ) => {
  var data = {};
  metrics.forEach( metric => data[ metric ] = getMetricFromMeasurements( measurements, metric ) );
  return data;
};

export const pairStatsWithData = ( metrics, stats ) => {
  var pairedStats = [];

  Object.keys( metrics ).map(
    ( key ) => {

      //filter out metrics that have no data
      if ( metrics[ key ].length === 0 ) { return; }

      stats.map(
        ( stat ) => {
          var metricData = metrics[ key ];
          var value = getDataValue( stat, metricData );
          var paired = { metric: key, stat: stat, value: value };

          pairedStats.push( paired );
        }
      );
    }
  );

  return pairedStats;
};

const getMetricFromMeasurements = ( measurements, metric ) => {
  var metricsFromMeasurements = [];

  measurements.forEach(
    ( measurement ) => {
      var metricIsValid = validateMetric( measurement, metric );

      if ( !metricIsValid ) { return; };

      var metricFromMeasurements = measurement.getMetric( metric );

      metricsFromMeasurements.push( metricFromMeasurements );
    }
  );

  // sort the arrays to make calcs easier
  return metricsFromMeasurements.sort();
};

const validateMetric = ( measurement, metric ) => {
  return measurement.getMetric( metric );
};

const getDataValue = ( stat, metricData ) => {
  if ( stat === 'min' ) {
    return getMin( metricData );
  }

  else if ( stat === 'average' ) {
    return getAvg( metricData );
  }

  else if ( stat === 'max' ) {
    return getMax( metricData );
  }
}

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


const roundedFloat = ( data ) => parseFloat( data ).toFixed( 1 );
