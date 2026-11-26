
import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, cert, App } from "firebase-admin/app";
import { readFileSync } from "node:fs";
import { join } from "node:path";

class NotificationService {
    private client: App;

    constructor() {
        const serviceAccount = JSON.parse(
            readFileSync(
                join(
                    process.cwd(),
                    "src/config/social-app-d04bd-firebase-adminsdk-fbsvc-101ba86fec.json"
                ),
                "utf8"
            )
        );

        this.client = initializeApp({
            credential: cert(serviceAccount),
        });
    }

    async sendNotification({
        token,
        data,
    }: {
        token: string;
        data: {
            title: string;
            body: string;
        };
    }) {
        return await getMessaging(this.client).send({
            token,
            notification: {
                title: data.title,
                body: data.body,
            },
        });
    }
}

export default new NotificationService();
