import * as storeAssistant from './store-helpers';
import { Measurement } from './measurement';
import { HttpError } from '../errors';
import { Stockist } from './stockist';

const measurementsStore = [];

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */

export function add ( measurement ) {
  const stockist = new Stockist( measurementsStore );
  return stockist.addMeasurement( measurement );
};

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch( timestamp ) {
  const stockist = new Stockist( measurementsStore );
  return stockist.readMeasurement( timestamp );
};

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange( from, to ) {
  const stockist = new Stockist( measurementsStore );
  return stockist.queryMeasurements( from, to, measurementsStore )
};
