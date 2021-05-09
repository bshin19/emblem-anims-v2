import React, { ReactElement, useEffect, useState } from "react"
import { Paper, Typography, makeStyles } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { AnimCard } from "../../pattern/card"
import { Anims } from "../../pattern/anim.definitions"

const useStyles = makeStyles({
	header: {
		position: "sticky",
		top: "70px",
	},
})

const getFeClasses = (feClass: string): Promise<Anims> =>
	fetch(`/api/v1/anim/class/${feClass}`).then((response) => response.json())

export const ClassesPage = (): ReactElement => {
	const classes = useStyles()
	const { feClass } = useParams()
	const [isLoaded, setIsLoaded] = useState(false)
	const [feClassAnims, setFeClassAnims] = useState<Anims>([])

	useEffect(() => {
		getFeClasses(feClass).then(
			(result) => {
				setIsLoaded(true)
				setFeClassAnims(result)
			},
			(error) => console.log(error)
		)
	}, [feClass])

	return (
		<Paper>
			<Typography
				variant="h6"
				component="h2"
				align="center"
				className={classes.header}>
				{feClass}
			</Typography>
			{isLoaded &&
				feClassAnims.map((feClassAnim) => {
					console.log(feClassAnim)
					return (
						<AnimCard
							key={`${feClassAnim.feClass}-${feClassAnim.name}`}
							animJson={feClassAnim}
						/>
					)
				})}
			{/* <img src='https://drive.google.com/uc?export=view&id={id}'/> */}
		</Paper>
	)
}
