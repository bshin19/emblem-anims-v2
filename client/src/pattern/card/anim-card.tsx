import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	}
})

export const AnimCard = (): JSX.Element => {
	const classes = useStyles()
	const [isAnimated, setIsAnimated] = useState(false)

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<Typography gutterBottom variant="h5" component="h2" align="center">
					Journeyman
				</Typography>
			</CardActionArea>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="axe"
					height="140"
					//   https://drive.google.com/uc?export=view&id={fileId}
					image={isAnimated ? "img/Axe.gif" : "img/Axe_000.png"}
					title="Journeyman Axe"
					onClick={(): void => {
						setIsAnimated(!isAnimated)
					}}
				/>
			</CardActionArea>
			<CardActions>
				{/* Loop through weapons here */}
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions>
			<CardActions>
				{/* Loop through Contributors */}
				<Typography variant="body2" color="textSecondary" component="p">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
			</CardActions>
		</Card>
	)
}
