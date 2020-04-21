import React, { useMemo } from "react"
import { mockAnimationJSON } from "./_mock-animation-json"
// import animationJSON from '../../animations.json'
import { StyledTreeItem } from "../../pattern/styled-tree"
import { makeStyles, createStyles } from "@material-ui/core"

export interface SpellGrouping {
	element?: string
	category: string
	school?: string
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

interface SpellTextProps {
	category: string
	school?: string
	element?: string
}

/**
 * Formats spell group data and returns a pretty name
 */
const spellText = (props: SpellTextProps): string => {
	const { school, element } = props
	if (element) {
		return `${school} - ${element}`
	} else if (school && school !== "Anima") {
		return school
	} else if (school === "Anima") {
		return `${school} - All`
	} else {
		return "Skills"
	}
}

export const SidebarSpells = (): JSX.Element => {
	const classes = useStyles()

	const spellGroupings = useMemo((): Array<SpellGrouping> => {
		const spellGroupingsSet = mockAnimationJSON.filter(
			(current, index, self) => {
				// Element-typed magic prioritized
				if (current.school && current.category && current.element) {
					return (
						self.findIndex((prev) => prev.element === current.element) === index
					)
				}
				// Then schools of magic
				else if (current.school && current.category) {
					return (
						self.findIndex((prev) => prev.school === current.school) === index
					)
				}
				// Then skill
				else if (current.category === "SKL") {
					return (
						self.findIndex((prev) => prev.category === current.category) ===
						index
					)
				} else return false
			}
		)
		return spellGroupingsSet as Array<SpellGrouping>
	}, [])

	return (
		<>
			{spellGroupings
				.sort((a, b) =>
					a.category < b.category ? -1 : a.category > b.category ? 1 : 0
				)
				.map((spellGroup) => {
					const spellTitle = spellText(spellGroup)
					return (
						<StyledTreeItem
							key={spellTitle}
							labelIcon={
								<div className={classes.classIconWrapper}>
									<img
										className={classes.classIcon}
										src={`_img/navigation-icon/${spellTitle}.png`}
										alt={`Open ${spellTitle} Dropdown`}
									/>
								</div>
							}
							labelText={spellTitle}
							nodeId={spellTitle}
						/>
					)
				})}
		</>
	)
}
