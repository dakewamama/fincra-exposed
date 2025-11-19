import { ConfigService } from '@nestjs/config';
import { BusinessResponse } from './interfaces/business.interface';
export declare class FincraService {
    private config;
    private readonly client;
    constructor(config: ConfigService);
    private handleError;
    getBusinessId(): Promise<BusinessResponse>;
}
