import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';
import {
  validateParams,
  pairMetricWithData,
  pairStatsWithData
} from './aggregator-helper';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats( measurements, metrics, stats ) {
  var paramsAreValid = validateParams(  measurements, metrics, stats );

  if ( paramsAreValid ) {
    var metrics = pairMetricWithData( measurements, metrics );
    var pairedStats = pairStatsWithData( metrics, stats );
    return pairedStats;
  }
};
