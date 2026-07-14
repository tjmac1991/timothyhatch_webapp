import { Box, Link, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ShopCostSupport(): ReactElement {
    return (
        <Box component="main" className="ShopCostSupport">
            <Typography component="h1" variant="h3">
                ShopCost Support
            </Typography>

            <Typography component="h2" variant="h5">
                Need help with ShopCost?
            </Typography>

            <Typography component="p">
                Email:{" "}
                <Link href="mailto:support@timothyhatch.com">
                    support@timothyhatch.com
                </Link>
            </Typography>

            <Typography component="p">
                Please include your device model, iOS version, ShopCost app version, and a short
                description of the issue.
            </Typography>

            <Typography component="p">
                ShopCost is an app for estimating job costs, managing shop rates, and creating
                invoices.
            </Typography>

            <Link component={RouterLink} to="/shopcost-privacy">
                View the ShopCost Privacy Policy
            </Link>
        </Box>
    );
}
