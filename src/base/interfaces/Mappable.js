import Mapper from "../classes/Mapper";
import flatMapper from "../mappers/flatMapper";
import MapFromOptions from "../classes/flags/MapFromOptions";

class Mappable {
    mapTo(mappingFunction) {
        return mappingFunction(this);
    }

    /*
     *  mapFrom - static
     *
     *   Returns a value/object given a mapping function and an object from which to perform the map.
     *     - mappingFunction (required): a function that receives the raw object and returns a mapped object.
     *     - obj (required): the raw object to be mapped.
     *     - ancillaryData (default=null): an object containing a number of static properties whose values
     *       may be assigned to the mapped object or used to compute other object properties;
     *       default is null.
     *     - withUnlistedPropertyMappings (default=false): specify whether or not to map properties to the
     *       target object if the target object doesn't already contain a property with the name
     *       specified in ancillaryData.
     *     - overwrite (default=false): flag that indicated if the mapping function should overwrite a value
     *       in the target object when there is a matching key name - useful when target and ancillaryData has
     *       "id" keys for instance.
     */

    static mapFrom = function(mapper, obj, ancillaryData = null, withUnlistedPropertyMappings = false, overwrite = false) {
        if (!(mapper instanceof Mapper || mapper instanceof Mapper)) throw Error("Invalid mapper parameter in Mapper.mapFrom");
        if (!obj) return null;
        if (!(obj instanceof Object || arrayData == null)) return null;

        const isMultiple = Array.isArray(obj);

        const mapped = isMultiple
            ? mapper.multiple(obj, ancillaryData)
            : mapper.single(obj, null, null, ancillaryData);

        // if we're mapping an array then we're done
        if (isMultiple) return mapped;

        // if we have a mapped object and static mappings then lets map those static values to the mapped object
        if (mapped && ancillaryData && ancillaryData instanceof Object) {
            for(let mapping in ancillaryData) {
                // if we have a value in the same key on the mapped object but
                // don't have the overwrite flag set, skip it.
                if (ancillaryData[mapping] && mapped[mapping] && !overwrite) continue;

                // map the value if we are bypassing property name checks or if the property name
                // exists in the mapped object.
                if (withUnlistedPropertyMappings || mapped.hasOwnProperty(mapping)) {
                    mapped[mapping] = ancillaryData[mapping];
                }
            }
        }

        return mapped;
    }
    static mapFromNew = function(...args) {
        const mapper = args.filter(arg => arg instanceof Mapper)[0] || flatMapper;
        const options = args.filter(arg => arg instanceof MapFromOptions)[0] || new MapFromOptions();
        const objects = args.filter(arg => arg instanceof Object && arg !== mapper && arg !== options);
        const obj = objects[0];
        const ancillaryData = objects[1];
        const withUnlistedPropertyMappings = options.has("WithUnlistedPropertyMappings");
        const overwrite = options.has("WithOverwrite");

        if (!obj) return null;

        const isMultiple = Array.isArray(obj);

        const mapped = isMultiple
            ? mapper.multiple(obj, ancillaryData)
            : mapper.single(obj, null, null, ancillaryData);

        // if we're mapping an array then we're done
        if (isMultiple) return mapped;

        // if we have a mapped object and static mappings then lets map those static values to the mapped object
        if (mapped && ancillaryData && ancillaryData instanceof Object) {
            for(let mapping in ancillaryData) {
                // if we have a value in the same key on the mapped object but
                // don't have the overwrite flag set, skip it.
                if (ancillaryData[mapping] && mapped[mapping] && !overwrite) continue;

                // map the value if we are bypassing property name checks or if the property name
                // exists in the mapped object.
                if (withUnlistedPropertyMappings || mapped.hasOwnProperty(mapping)) {
                    mapped[mapping] = ancillaryData[mapping];
                }
            }
        }

        return mapped;
    }
}

export default Mappable;
