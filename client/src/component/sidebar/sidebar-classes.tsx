import React, { FC, useMemo } from "react"
import { mockAnimationJSON } from "./_mock-animation-json"
// import animationJSON from '../../animations.json'
import { StyledTreeItem } from "../../pattern/styled-tree"
import { SidebarClassOptionsValues } from "./sidebar-class-options"
import { makeStyles, createStyles } from "@material-ui/core"
import { useHistory } from "react-router-dom"

interface ClassOptions {
	tiers: Array<string>
	categories: Array<string>
}

interface AnimGrouping {
	feClass: string
	tier: string
	category: string
}

interface SidebarClassesProps {
	classSortStyle: SidebarClassOptionsValues
}

const useStyles = makeStyles(() =>
	createStyles({
		classIcon: {
			maxWidth: "16px",
			maxHeight: "16px",
		},
		classIconWrapper: {
			width: "20px",
			height: "16px",
			display: "flex",
		},
	})
)

interface PrettyCategoryProps {
	category: string
}

const makeCategoryPretty = ({ category }: PrettyCategoryProps): string => {
	switch (category) {
		case "SWD":
			return "Sword Infantry"
		case "AXE":
			return "Axe Infantry"
		case "LNC":
			return "Lance Infantry"
		case "BOW":
			return "Bow Infantry"
		case "ARM":
			return "Armor"
		case "CAV":
			return "Cavalry"
		case "FLY":
			return "Flying"
		case "MAG":
			return "Magic"
		case "LRD":
			return "Lord"
		case "MISC":
			return "Miscellaneous"
		case "MON":
			return "Monster"
		case "SPL":
			return "Miscellaneous"
		case "SKL":
			return "Miscellaneous"
		default:
			return "Miscellaneous"
	}
}

export const SidebarClasses: FC<SidebarClassesProps> = ({
	classSortStyle,
}: SidebarClassesProps) => {
	const classes = useStyles()
	const history = useHistory()

	const animGroupings = useMemo((): Array<AnimGrouping> => {
		const animGroupingsSet = mockAnimationJSON.filter(
			(current, index, self): boolean => {
				if (current.tier && current.category && current.feClass) {
					return (
						self.findIndex((prev) => prev.feClass === current.feClass) === index
					)
				} else return false
			}
		)
		return animGroupingsSet as Array<AnimGrouping>
	}, [])

	const handleClassClick = (className: string): void => {
		history.push(`/class/${className}`)
	}

	const sortOptions = animGroupings.reduce<ClassOptions>(
		(accumulator, current) => {
			if (current.tier && accumulator.tiers.indexOf(current.tier) === -1) {
				accumulator.tiers.push(current.tier)
			}
			if (
				current.category &&
				accumulator.categories.indexOf(current.category) === -1
			) {
				accumulator.categories.push(current.category)
			}
			return accumulator
		},
		{
			tiers: [],
			categories: [],
		}
	)

	return (
		<>
			{classSortStyle === "tier"
				? sortOptions.tiers
						.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
						.map((tier) => {
							const prettyTierName = tier.replace(/T/, "Tier ")
							return (
								<StyledTreeItem
									key={prettyTierName}
									nodeId={prettyTierName}
									labelText={prettyTierName}>
									<>
										{animGroupings
											.sort((a, b) =>
												a.feClass < b.feClass
													? -1
													: a.feClass > b.feClass
													? 1
													: 0
											)
											.map(
												(animGrouping) =>
													animGrouping.tier === tier && (
														<StyledTreeItem
															key={animGrouping.feClass}
															labelIcon={
																<div className={classes.classIconWrapper}>
																	<img
																		className={classes.classIcon}
																		src={`_img/navigation-icon/${animGrouping.feClass}.gif`}
																		alt={`Open ${animGrouping.feClass} Dropdown`}
																	/>
																</div>
															}
															onClick={(): void =>
																handleClassClick(animGrouping.feClass)
															}
															labelText={animGrouping.feClass}
															nodeId={animGrouping.feClass}
														/>
													)
											)}
									</>
								</StyledTreeItem>
							)
						})
				: classSortStyle === "category"
				? sortOptions.categories
						.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
						.map((category) => {
							const prettyCategoryName = makeCategoryPretty({ category })
							return (
								<StyledTreeItem
									nodeId={category}
									key={prettyCategoryName}
									labelText={prettyCategoryName}>
									<>
										{animGroupings
											.sort((a, b) =>
												a.feClass < b.feClass
													? -1
													: a.feClass > b.feClass
													? 1
													: 0
											)
											.map(
												(animGrouping) =>
													animGrouping.category === category && (
														<StyledTreeItem
															onClick={(): void =>
																handleClassClick(animGrouping.feClass)
															}
															labelIcon={
																<div className={classes.classIconWrapper}>
																	<img
																		className={classes.classIcon}
																		src={`_img/navigation-icon/${animGrouping.feClass}.gif`}
																		alt={`Open ${animGrouping.feClass} Dropdown`}
																	/>
																</div>
															}
															labelText={animGrouping.feClass}
															nodeId={animGrouping.feClass}
														/>
													)
											)}
									</>
								</StyledTreeItem>
							)
						})
				: animGroupings
						.sort((a, b) =>
							a.feClass < b.feClass ? -1 : a.feClass > b.feClass ? 1 : 0
						)
						.map(({ feClass }) => (
							<StyledTreeItem
								key={feClass}
								onClick={(): void => handleClassClick(feClass)}
								labelIcon={
									<div className={classes.classIconWrapper}>
										<img
											className={classes.classIcon}
											src={`_img/navigation-icon/${feClass}.gif`}
											alt={`Open ${feClass} Dropdown`}
										/>
									</div>
								}
								labelText={feClass}
								nodeId={feClass}
							/>
						))}
		</>
	)
}
