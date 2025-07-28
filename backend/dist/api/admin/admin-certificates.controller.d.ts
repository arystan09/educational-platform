import { CertificateService } from '../certificates/certificate.service';
export declare class AdminCertificatesController {
    private readonly certService;
    constructor(certService: CertificateService);
    getAll(): string[];
    remove(id: string): string;
}
