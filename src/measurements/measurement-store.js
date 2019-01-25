import * as storeAssistant from './store-helpers';
import { Measurement } from './measurement';
import { HttpError } from '../errors';

const measurementsStore = [];

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */

export function add ( measurement ) {
  var isDuplicateRecord = storeAssistant.noDuplicateExists( measurement, measurementsStore );

  if ( !isDuplicateRecord ) {
    measurement = storeAssistant.addMeasurement( measurement, measurementsStore );
    return measurement;
  }
  else {
    throw new HttpError( 409 );
  }
  throw new HttpError( 501 );

};

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch( timestamp ) {
  if ( storeAssistant.timestampIsValid( timestamp ) ) {
    var measurement = storeAssistant.browserMeasurementsStore( timestamp, measurementsStore );

    if ( measurement ) {
      return measurement;
    }
    else {
      throw new HttpError( 404 );
    }
  }
  else {
    throw new HttpError( 422 );
  }
};

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange( from, to ) {
  var validQuery = storeAssistant.validateQueryDates( from, to );

  if ( validQuery ) {
    var measurements = storeAssistant.queryBrowserMeasurementsStore( from, to, measurementsStore );

    if ( measurements && measurements.length > 0 ) {
      return measurements;
    }
    else {
      throw new HttpError( 400 );
    }
  }
  else {
    throw new HttpError( 422 );
  }
}
