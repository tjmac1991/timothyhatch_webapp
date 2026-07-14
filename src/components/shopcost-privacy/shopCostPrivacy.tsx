import { Box, Link, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function ShopCostPrivacy(): ReactElement {
    return (
        <Box component="main" className="ShopCostPrivacy">
            <Typography component="h1" variant="h3">
                ShopCost Privacy Policy
            </Typography>

            <Typography className="ShopCostPrivacy__effective-date" component="p">
                <strong>Effective Date:</strong> July 14, 2026
            </Typography>

            <Typography component="p">
                ShopCost is designed to help you estimate job costs, manage shop rates, save jobs,
                and create invoices. Your privacy matters, and ShopCost is built to avoid collecting
                unnecessary personal information.
            </Typography>

            <Typography component="h2" variant="h5">Information ShopCost Collects</Typography>
            <Typography component="p">
                ShopCost does not require an account and does not collect personal information
                directly from you.
            </Typography>
            <Typography component="p">
                The app stores the information you enter, such as jobs, materials, labor rates,
                equipment rates, add-ons, invoice details, and settings, on your device. This
                information is used only to provide the app’s features.
            </Typography>
            <Typography component="p">
                ShopCost does not sell your data, track you across apps or websites, or use
                third-party advertising.
            </Typography>

            <Typography component="h2" variant="h5">In-App Purchases and Subscriptions</Typography>
            <Typography component="p">
                ShopCost Pro subscriptions are processed by Apple through the App Store. ShopCost
                may receive subscription status information from Apple so the app can unlock Pro
                features. Payment information is handled by Apple and is not collected or stored by
                ShopCost.
            </Typography>

            <Typography component="h2" variant="h5">Sharing and Imported Files</Typography>
            <Typography component="p">
                ShopCost lets you export and import ShopCost files. These files may contain the job,
                material, labor, equipment, add-on, invoice, or pricing information you choose to
                share.
            </Typography>
            <Typography component="p">
                You control when and how these files are shared. If you send a ShopCost file through
                Messages, email, AirDrop, cloud storage, or another app, that sharing is handled by
                the service you choose.
            </Typography>

            <Typography component="h2" variant="h5">Support Requests</Typography>
            <Typography component="p">
                If you contact support, you may choose to provide your name, email address, device
                information, app version, or details about the issue you are experiencing. This
                information is used only to respond to your request and provide support.
            </Typography>

            <Typography component="h2" variant="h5">Data Storage</Typography>
            <Typography component="p">
                ShopCost data is stored locally on your device unless you choose to export, share,
                back up, or transfer it using Apple or third-party services.
            </Typography>

            <Typography component="h2" variant="h5">Data Deletion</Typography>
            <Typography component="p">
                You can delete records inside the app. You can also delete all locally stored
                ShopCost data by deleting the app from your device.
            </Typography>

            <Typography component="h2" variant="h5">Children’s Privacy</Typography>
            <Typography component="p">
                ShopCost is not directed to children and does not knowingly collect personal
                information from children.
            </Typography>

            <Typography component="h2" variant="h5">Changes to This Policy</Typography>
            <Typography component="p">
                This Privacy Policy may be updated from time to time. Any changes will be posted on
                this page with an updated effective date.
            </Typography>

            <Typography component="h2" variant="h5">Contact</Typography>
            <Typography component="p">
                If you have questions about this Privacy Policy or need support, contact:
            </Typography>
            <Link href="mailto:support@timothyhatch.com">support@timothyhatch.com</Link>
        </Box>
    );
}
