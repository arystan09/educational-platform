import { CertificateService } from './certificate.service';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificateService);
    getUserCertificates(req: any): Promise<import("./entities/certificate.entity").Certificate[]>;
}
