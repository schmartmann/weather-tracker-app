var metricTypes = [
  {
    name: 'timestamp', dataType: 'Date'
  },
  {
    name: 'temperature', dataType: 'Float'
  },
  {
    name: 'dewPoint', dataType: 'Float'
  },
  {
    name: 'precipitation', dataType: 'Float'
  }
];

export function assignMeasurementMetrics( measurement, metrics ) {
  metricTypes.forEach(
    metricType => {
      const { name, dataType } = metricType;

      if ( !metricAlreadyAssigned( measurement, name ) ) {
        var valueFromMetrics = getValueFromMetrics( metrics, name );
        var value = castMetric( valueFromMetrics, dataType );

        measurement[ name ] = value;
      }
    }
  )
};

function metricAlreadyAssigned( measurement, name ) {
  return measurement.hasOwnProperty( name );
};

function metricIsPresent( metrics, name ) {
  return metrics.hasOwnProperty( name );
};

function getValueFromMetrics( metrics, name ) {
  var value = null;

  if ( metricIsPresent( metrics, name ) ) {
    value = metrics[ name ];
  }

  return value;
};

function castMetric( value, dataType ) {
  if ( typeof value !== null ) {
    if ( dataType === 'Date' ) {
      value = new Date( value );
    }
    else if ( dataType === 'Float' ) {
      value = parseFloat( value );
    }
  }

  return value;
};

function assignMetricToMeasurement( measurement, name, value ) {
  measurement.setMetric( name, value );
  return measurement;
};
