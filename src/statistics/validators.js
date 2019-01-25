export const validateParams = ( measurements, metrics, stats ) => {
  return validateMeasurements( measurements ) &&
    validateMetrics( metrics ) &&
    validateStats( stats );
};

const validateMeasurements = ( measurements ) => measurements && measurements.length > 0;

const validateMetrics = ( metrics ) => metrics && metrics.length > 0;

const validQueryStatistics = [
  'min',
  'max',
  'average'
];

const validateStats = ( stats ) => {
  stats = stats.filter( stat => validQueryStatistics.includes( stat ) );
  return( stats && stats.length > 0 );
};
