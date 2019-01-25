import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';
import { validateParams } from './validators';
import { Aggregation } from './aggregation';

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
    const aggregation = new Aggregation( measurements, metrics, stats );
    return aggregation.buildAggregation();
  }
  else {
    throw new HttpError( 400 );
  }
};
