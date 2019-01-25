import { HttpError } from '../errors';

// the stockist manages the store
// in other words, it handles state changes to the store
export class Stockist {
  constructor( store ) {
    this.store = store;
    this.timestamp;
    this.measurement;
  };

  // -------------------------- public methods ---------------------------------
  addMeasurement( measurement ) {
    this.measurement = measurement;
    this.timestamp = measurement.timestamp.toISOString();

    if ( !this._isDuplicateRecord() ) {
      this.store.push( measurement );
      this._sortStore();
      return this.measurement
    }
    else {
      throw new HttpError( 409 );
    }
  };

  readMeasurement( timestamp ) {
    if ( this._isValidTimestamp( timestamp ) ) {
      this.timestamp = timestamp;
      this.measurement = this._fetchMeasurementsStore();

      if ( this.measurement ) {
        console.log( 'successfully found', this.measurement );
        return this.measurement;
      }
      else {
        throw new HttpError( 404 );
      }
    }
    else {
      throw new HttpError( 422 )
    }
  };

  queryMeasurements( from, to ) {
    if ( this._areValidQueryDates( from, to ) ) {
      this.fromDate = from;
      this.toDate   = to;

      var measurements = this._queryMeasurementsStore();

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
  };

  // -------------------------- private methods --------------------------------
  // -------------------------- validators -------------------------------------
  _isDuplicateRecord() {
    // very measurement w/timestamp doesn't already exist
    const { store } = this;

    var storedTimestamps = store.map(
      measurement => measurement.timestamp.toISOString()
    );

    return storedTimestamps.includes( this.timestamp );
  };

  _isValidTimestamp( timestamp ) {
    return !isNaN( timestamp.valueOf() )
  };

  _areValidQueryDates( from, to ) {
    return this._isValidTimestamp( from ) && this._isValidTimestamp( to );
  };

  // -------------------------- store interactions -----------------------------
  _sortStore() {
    // sort store by timestamp earliest to latest;
    var sortedStore = this.store.slice( 0 );

    sortedStore.sort(
      ( itemOne, itemTwo ) =>
        itemOne.timestamp.toISOString() > itemTwo.timestamp.toISOString()
    );

    this.store = sortedStore;
  };

  _fetchMeasurementsStore() {
    // returns up to one measurement

    const { store, timestamp } = this;

    return store.find(
      measurement =>
        measurement.timestamp.toISOString() === timestamp.toISOString()
    );
  };

  _queryMeasurementsStore() {
    // returns array of measurements

    const { store, fromDate, toDate } = this;

    return store.filter(
      ( measurement ) => {
        const { timestamp } = measurement;

        if ( timestamp >= fromDate && timestamp < toDate ) {
          return measurement;
        }
      }
    );
  }
};
