"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FincraService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let FincraService = class FincraService {
    config;
    client;
    constructor(config) {
        this.config = config;
        const apiKey = this.config.get('FINCRA_API_KEY');
        const baseUrl = this.config.get('FINCRA_BASE_URL', 'https://sandboxapi.fincra.com');
        if (!apiKey) {
            throw new Error('FINCRA_API_KEY is required');
        }
        this.client = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            timeout: 30000,
        });
        this.client.interceptors.response.use((response) => response, (error) => {
            return this.handleError(error);
        });
    }
    handleError(error) {
        const status = error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errorData = error.response?.data || {};
        const message = errorData.message || error.message || 'Fincra API request failed';
        throw new common_1.HttpException({
            statusCode: status,
            message,
            error: error.response?.data,
            timestamp: new Date().toISOString(),
        }, status);
    }
    async getBusinessId() {
        const response = await this.client.get('/profile/business/me');
        return response.data;
    }
};
exports.FincraService = FincraService;
exports.FincraService = FincraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FincraService);
//# sourceMappingURL=fincra.service.js.map