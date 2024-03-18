import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import StealTheCheeseIcon from "../../assets/icons/rsz_steal_the_cheese.png";
import EtchSketchIcon from "../../assets/icons/rsz_etch_a_sketch.png";
import StarFactionsIcon from "../../assets/icons/rsz_star_factions.png";

export default function Projects(): ReactElement {
    return (
        <Box className="Projects">
            <Typography className="Projects__main-title" variant="h4">School Projects</Typography>
            
            <Typography className="Projects--sub-title" variant="h5">Javascript Games (made with Perlenspiel)</Typography>
            <Box className="Projects__js-games">
                <Box className="Projects--js-game">
                    <span>Steal the Cheese</span>
                    <Box component="a" href="/Frogger/game.html">
                        <img src={StealTheCheeseIcon} />
                    </Box>
                </Box>
                <Box className="Projects--js-game">
                    <span>Etch-a-Sketch</span>
                    <Box component="a" href="/EtchSketch/game.html">
                        <img src={EtchSketchIcon} />
                    </Box>
                </Box>
            </Box>
            <Box className="Projects__board-game">
                <Typography className="Projects--sub-title" variant="h5">Board Game (with printables, designed with a team)</Typography>
                <Box component="a" href="/TeamAnonymoose_Prototype_0114.pdf">
                    <img className="Projects__board-game--image" src={StarFactionsIcon} />
                </Box>
            </Box>
        </Box>

    );
}
