export interface ResponseData {
    code: number;
    title: string;
    message: string;
    data: any;
}

export class Responder {
    static response(
        code: number,
        title: string = '',
        message: string = '',
        data: any = null
    ): ResponseData {
        if (code >= 200 && code < 300) {
            title = title || 'success';
            message = message || 'İşlem başarılı';
        } else if (code === 400) {
            title = title || 'bad request';
            message = message || 'Geçersiz istek';
        } else if (code === 500) {
            title = title || 'server error';
            message = message || 'Sunucu hatası oluştu';
        }

        return { code, title, message, data };
    }
}
