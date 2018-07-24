declare interface Price {
    current(currency?: string): Promise<any>;
}

export default Price;