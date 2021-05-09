/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { CardHeader, IconButton } from "@material-ui/core"
import { Anim } from "../anim.definitions"
import { weaponSortOrder } from "../weapon.definitions"
import { Link } from "react-router-dom"
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded"
import { faVenus, faVenusMars, faMars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	headerRoot: {
		padding: 0,
	},
	headerContent: {
		marginLeft: "28px",
	},
	weaponIconButton: {
		borderRadius: 0,
		padding: 0,
	},
	headerAction: {
		alignSelf: "unset",
		marginTop: 0,
		marginRight: "4px",
	},
	headerActionIcon: {
		padding: 0,
	},
})

interface GenderIconProps {
	gender: string
}

const useGenderIconStyles = makeStyles({
	root: {
		marginLeft: "3px",
		marginBottom: "1px",
	},
})

const GenderIcon = ({ gender }: GenderIconProps): JSX.Element => {
	const classes = useGenderIconStyles()
	return (
		<FontAwesomeIcon
			className={classes.root}
			size="xs"
			icon={gender === "U" ? faVenusMars : gender === "F" ? faVenus : faMars}
		/>
	)
}

// showTier, showClass, showCategory

/**
 * Options that can be toggled on to display more information
 */
interface ValueOverrides {
	showTier?: boolean
	showClass?: boolean
	showCategory?: boolean
}

interface AnimCardProps {
	animJson: Anim
	valueOverrides?: ValueOverrides
}

export const AnimCard = ({
	animJson,
	valueOverrides = {},
}: AnimCardProps): JSX.Element => {
	const {
		category,
		credit,
		download,
		feClass,
		gender,
		name,
		tier,
		weapons,
	} = animJson

	const {
		showTier = false,
		showClass = false,
		showCategory = false,
	} = valueOverrides

	const classes = useStyles()
	const [isAnimated, setIsAnimated] = useState(false)
	const [selectedWeaponIndex, setSelectedWeaponIndex] = useState(0)

	const prettyWeapons = weapons.sort((leftIndex, rightIndex) =>
		weaponSortOrder.indexOf(leftIndex.type) <
		weaponSortOrder.indexOf(rightIndex.type)
			? -1
			: 1
	)
	const selectedWeapon = prettyWeapons[selectedWeaponIndex]
	const prettyContributors = credit.sort()

	return (
		<Card className={classes.root}>
			<CardHeader
				classes={{
					root: classes.headerRoot,
					action: classes.headerAction,
					content: classes.headerContent,
				}}
				title={
					<>
						{feClass}
						{<GenderIcon gender={gender} />} - {name}
					</>
				}
				titleTypographyProps={{
					align: "center",
					variant: "h6",
				}}
				action={
					<IconButton
						classes={{
							root: classes.headerActionIcon,
						}}
						size="small"
						aria-label="download"
						onClick={(): void => window.location.assign(download)}>
						<GetAppRoundedIcon />
					</IconButton>
				}
			/>
			<CardActionArea>
				<CardMedia
					component="img"
					alt={selectedWeapon.type}
					height="140"
					// https://drive.google.com/uc?export=view&id={fileId}
					// image={isAnimated ? "img/Axe.gif" : "img/Axe_000.png"}
					image={
						isAnimated
							? `https://drive.google.com/uc?export=view&id=${selectedWeapon.active}`
							: `https://drive.google.com/uc?export=view&id=${selectedWeapon.static}`
					}
					title={`${feClass} ${name} ${selectedWeapon.type}`}
					onClick={(): void => {
						setIsAnimated(!isAnimated)
					}}
				/>
			</CardActionArea>
			{/* Weapons Section */}
			<CardActions>
				{prettyWeapons.map((weapon, index) => (
					<IconButton
						classes={{
							root: classes.weaponIconButton,
						}}
						key={`${name}-${weapon}-${index}`}
						size="small"
						color="primary"
						onClick={(): void => {
							setIsAnimated(false)
							setSelectedWeaponIndex(index)
						}}>
						<img
							src={`_img/weapon-icon/${weapon.type}.png`}
							alt={weapon.type}
						/>
					</IconButton>
				))}
			</CardActions>
			<CardActions>
				{/* Loop through Contributors */}
				<Typography variant="body2" color="textSecondary" component="p">
					Contributors:
					{prettyContributors.map((contributor) => (
						<div>{contributor}</div>
						// <Link to="/about">{contributor}</Link>
					))}
				</Typography>
			</CardActions>
		</Card>
	)
}
