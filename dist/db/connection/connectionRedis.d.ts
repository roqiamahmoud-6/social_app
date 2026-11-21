export declare class redisService {
    private readonly redisClient;
    constructor();
    handleEvent(): void;
    connect(): Promise<void>;
    setValue({ key, value, ex }: {
        key: any;
        value: any;
        ex: number;
    }): Promise<void>;
    getValue({ key }: {
        key: any;
    }): Promise<any>;
    incr({ key, ex }: {
        key: any;
        ex?: number;
    }): Promise<number>;
    deleteKey({ key }: {
        key: any;
    }): Promise<void>;
    ttl({ key }: {
        key: any;
    }): Promise<number>;
    exist({ key }: {
        key: any;
    }): Promise<number>;
    updateIfExist({ key, value, ex }: {
        key: any;
        value: any;
        ex: number;
    }): Promise<0 | undefined>;
}
declare const _default: redisService;
export default _default;
//# sourceMappingURL=connectionRedis.d.ts.map