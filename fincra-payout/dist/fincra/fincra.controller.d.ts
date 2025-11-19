import { FincraService } from './fincra.service';
import { BusinessResponse } from './interfaces/business.interface';
export declare class FincraController {
    private readonly fincraService;
    constructor(fincraService: FincraService);
    getBusinessId(): Promise<BusinessResponse>;
}
