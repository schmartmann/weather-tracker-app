import { Measurement } from '../measurements/measurement';
import { Aggregation } from './aggregation';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats( measurements, metrics, stats ) {
  const aggregation = new Aggregation( measurements, metrics, stats );
  return aggregation.buildAggregation();
};
