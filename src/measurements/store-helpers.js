export const noDuplicateExists = ( measurement, measurementsStore ) => {
  var timestamp = measurement.timestamp.toISOString();
  var storedTimestamps = measurementsStore.map( measurement => measurement.timestamp.toISOString() );
  return storedTimestamps.includes( timestamp );
};

export const sortStore = ( measurementsStore ) => {
  var sortedStore = measurementsStore.slice( 0 );
  sortedStore.sort( ( itemOne, itemTwo ) => itemOne.timestamp.toISOString() > itemTwo.timestamp.toISOString() );
  return sortedStore;
};

export const addMeasurement = ( measurement, measurementsStore ) => {
  measurementsStore.push( measurement );
  sortStore( measurementsStore );
  return measurement;
};

export const timestampIsValid = ( timestamp ) => {
  return timestamp !== 'Invalid Date';
}

export const browserMeasurementsStore = ( timestamp, measurementsStore ) => {
  return measurementsStore.find(
    measurement => {
      var measurementTimestamp = measurement.timestamp.toISOString();
      var paramsTimestamp = timestamp.toISOString();

      if (  measurementTimestamp === paramsTimestamp ) {
        return measurement;
      }
    }
  );
};
