import { Box, Divider } from "@mui/material";
import { ReactElement } from "react";
import { tPosts } from "../../models/post.model";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined';

type tPostProps = {
    postList: tPosts[],
}

export default function Posts({postList}: tPostProps): ReactElement {
    const renderedPost = postList.map((post, index) => {
        const endOfList = postList.length === index + 1;
        return (
            <Box key={index}>
                <h1>{post.title}</h1>
                <Box className="Posts__body">
                    <Box component="p" className="Posts__text">{post.text}</Box>
                    <Box className="Posts__date-container">
                        <CalendarMonthIcon />
                        <Box component="p" className="Posts__date-container--date">{post.datetime.toLocaleDateString()}</Box>
                    </Box>
                </Box>
                { !endOfList && <Divider variant="middle" />}
            </Box>
        )
    });

    return (
        <Box className="Posts">
            {renderedPost}
        </Box>
    );
}
