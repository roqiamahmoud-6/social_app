declare class NotificationService {
    private client;
    constructor();
    sendNotification({ token, data, }: {
        token: string;
        data: {
            title: string;
            body: string;
        };
    }): Promise<string>;
}
declare const _default: NotificationService;
export default _default;
//# sourceMappingURL=notification.service.d.ts.map