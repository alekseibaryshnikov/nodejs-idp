export enum Types {
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean"
}

/**
 * Utils class for converting settings from DB
 */
export class TypesConverter {
    public static convertToNumber(value: string): number {
        const converted: number = parseInt(value);

        if (converted) {
            return converted;
        } else {
            this.getConvertionError('boolean');
        }
    }

    public static convertToBoolean(value: string): boolean {
        const converted: boolean = JSON.parse(value);

        if (typeof converted === 'boolean') {
            return converted;
        } else {
            this.getConvertionError('boolean');
        }
    }

    private static getConvertionError(type: string) {
        throw new Error(`Error when converting setting value to ${type}.`);
    }
}