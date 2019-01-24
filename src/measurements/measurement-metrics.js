const metricTypes = [
  {
    name: 'timestamp', dataType: 'Date'
  },
  {
    name: 'temperature', dataType: 'Number'
  },
  {
    name: 'dewPoint', dataType: 'Number'
  },
  {
    name: 'precipitation', dataType: 'Number'
  }
];

export function assignMeasurementMetrics( measurement ) {
  metricTypes.forEach(
    metricType => {
      const { name, dataType } = metricType;

      if ( metricIsPresent( measurement, name ) ) {
        var value = getMetric( measurement, name );
        value = constructMetric( value, dataType );
        measurement.setMetric( name, value );
      }
      else {
        measurement.setMetric( name, null );
      }

      return measurement;
    }
  );
};

const metricIsPresent = ( measurement, key ) => {
  measurement.metrics.has( key )
};

const getMetric = ( measurement, key ) => {
  measurement.metrics.get( key )
};

const constructMetric = ( value, dataType ) => {
  eval( `new ${ dataType }(${ value })` )
}
