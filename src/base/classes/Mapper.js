import { Utilities } from "../../factor";
import { MapperOptionsFlag } from "../../factor";

/*
 *  Mapper
 *
 *  Usage: Mapper
 *         .FromType(type)
 *         .ToType(type)
 *         .WithMultipleMapper(multipleMappingFn)
 *         .WithSingleMapper(singleMappingFn)
 *         .WithOption(option)
 *
 */

class Mapper {
    #fromType;
    #toType;
    #multipleMapper;
    #singleMapper;
    #options;

    constructor(...args) {
        let funcs = args.filter(arg => typeof arg === "function" && !Utilities.isClass(arg));
        let classes = args.filter(arg => Utilities.isClass(arg));
        let options = args.filter(arg => Number.isInteger(arg));

        this
            .toType(classes[0])
            .fromType(classes[1])
            .withSingleMapper(funcs[0])
            .withMultipleMapper(funcs[1]);

        this.#options = new MapperOptionsFlag().set(options);
    }

    get options() {
        return this.#options;
    };

    multiple(items, data) {
        // if no items are passed in, return an empty array
        if (!(items && Array.isArray(items))) return [];

        // first map through the single mapper
        const singleMapped = this.#multipleMapper && this.#multipleMapper(items, data) || items.map((item, index, array) => this.#singleMapper(item, index, array, data));
        // then filter out null values if the NullFiltering flag is on
        const nullMapped = (this.#options.hasAny(this.#options.NullFiltering)) && singleMapped.filter(item => item != null) || singleMapped;
        // lastly filter out mapped values that are not of toType, if specified
        const typeMapped = this.#toType && nullMapped.filter(item => item instanceof this.#toType) || nullMapped;

        return typeMapped;
    }

    single(item, index, array, data) {
        // if we don't have a single mapping function, throw error
        if (!(this.#singleMapper && this.#singleMapper instanceof Function)) throw Error("Mapper does not contain a valid single() method");
        // if we don't have an item or there is a specified "from" type and the item
        // is not the same type, return a null
        if (!item || (this.#fromType && !item instanceof this.#fromType)) return;

        // run the item through the mapper
        const mapped = this.#singleMapper(item, index, array, data);
        // if there is a "to" type specified and the mapped item doesn't match,
        // set the return value to null;
        //const typeMapped = !this.#toType && mapped || mapped instanceof this.#toType && mapped;
        const typeMapped = (this.#toType && mapped instanceof this.#toType && mapped) || mapped;

        return typeMapped;
    }

    fromType(type) {
        this.#fromType = Utilities.isClass(type) && type;

        return this;
    }

    toType(type) {
        this.#toType = Utilities.isClass(type) && type;

        return this;
    }

    withMultipleMapper(multiple) {
        this.#multipleMapper = multiple instanceof Function && multiple;

        return this;
    }

    withOption(opt) {
        this.#options.Set(opt);

        return this;
    }

    withSingleMapper(single) {
        this.#singleMapper = single instanceof Function && single || this.#singleMapper;

        return this;
    }

    static fromType(type) {
        const mapper = new Mapper();

        return mapper.fromType(type);
    }

    static toType(type) {
        const mapper = new Mapper();

        return mapper.toType(type);
    }

    static withMultipleMapper(multiple) {
        const mapper = new Mapper();

        return mapper.withMultipleMapper(multiple)
    }

    static withOption(opt) {
        const mapper = new Mapper();

        return mapper.withOption(opt);
    }

    static withSingleMapper(single) {
        const mapper = new Mapper();

        return mapper.withSingleMapper(single);
    }
}

export default Mapper;
