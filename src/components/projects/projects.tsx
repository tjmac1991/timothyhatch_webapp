import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import StealTheCheeseIcon from "../../assets/icons/rsz_steal_the_cheese.png";
import EtchSketchIcon from "../../assets/icons/rsz_etch_a_sketch.png";
import StarFactionsIcon from "../../assets/icons/rsz_star_factions.png";

export default function Projects(): ReactElement {
    return (
        <Box className="Projects">
            <Typography variant="h4">School Projects</Typography>
            
            <Typography variant="h5">Javascript Games (made with Perlenspiel)</Typography>
            <Box component="a" href="/Frogger/game.html">
                <img src={StealTheCheeseIcon} />
            </Box>
            <Box component="a" href="/EtchSketch/game.html">
                <img src={EtchSketchIcon} />
            </Box>
            <Box className="Projects__board-game">
                <Typography variant="h5">Board Game (with printables, designed with a team)</Typography>
                <Box component="a" href="/TeamAnonymoose_Prototype_0114.pdf">
                    <img className="Projects__board-game--image" src={StarFactionsIcon} />
                </Box>
            </Box>
        </Box>

    );
}
