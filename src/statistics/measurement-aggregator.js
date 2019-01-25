import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';
import { pairMetricWithData, pairStatsWithData } from './aggregator-helper';
import { validateParams } from './validators';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats( measurements, metrics, stats ) {
  var queryParamsAreValid = validateParams(  measurements, metrics, stats );

  if ( queryParamsAreValid ) {
    var metrics = pairMetricWithData( measurements, metrics );
    var pairedStats = pairStatsWithData( metrics, stats );
    return pairedStats;
  }
  else {
    throw new HttpError( 400 );
  }
};
