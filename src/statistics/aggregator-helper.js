export const validateParams = ( measurements, metrics, stats ) => {
  return measurements.length > 0 && metrics.length > 0 && stats.length > 0;
};

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
          var paired = [ key, stat, value ];

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

  else if ( stat === 'avg' ) {
    return getAvg( metricData );
  }

  else if ( stat === 'max' ) {
    return getMax( metricData );
  }
}

const getMin = ( data ) => data[ 0 ];

const getMax = ( data ) => data[ data.length - 1 ];

const getAvg = ( data ) => {
  var sum;

  if ( data.length > 0 ) {
    sum = data.reduce( ( itemOne, itemTwo ) => itemOne + itemTwo );
    return( sum / data.length );
  }
};
