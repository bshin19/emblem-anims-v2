import React, { ReactNode, MouseEvent } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem"
import Typography from "@material-ui/core/Typography"

declare module "csstype" {
	interface Properties {
		"--tree-view-color"?: string
		"--tree-view-bg-color"?: string
	}
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			color: theme.palette.text.secondary,
			"&:hover > $content": {
				backgroundColor: theme.palette.action.hover,
			},
			"&:focus > $content, &$selected > $content": {
				backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
				color: "var(--tree-view-color)",
			},
			"&:focus > $content $label, &:hover > $content $label, &$selected > $content $label, &$selected > $content > $label:hover, &$selected:focus > $content > $label": {
				backgroundColor: "transparent",
			},
		},
		content: {
			color: theme.palette.text.secondary,
			borderTopRightRadius: theme.spacing(2),
			borderBottomRightRadius: theme.spacing(2),
			paddingRight: theme.spacing(1),
			fontWeight: theme.typography.fontWeightMedium,
			"$expanded > &": {
				fontWeight: theme.typography.fontWeightRegular,
			},
		},
		group: {
			marginLeft: 0,
		},
		expanded: {},
		selected: {},
		label: {
			fontWeight: "inherit",
			color: "inherit",
		},
		labelRoot: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0.5, 0),
		},
		labelIcon: {
			marginRight: theme.spacing(1),
		},
		labelText: {
			fontWeight: "inherit",
			flexGrow: 1,
		},
	})
)

type StyledTreeItemProps = TreeItemProps & {
	bgColor?: string
	color?: string
	labelInfo?: string
	labelIcon?: ReactNode
	labelText: string
	children?: ReactNode
	onClick?: (event: MouseEvent) => void
}

const StyledTreeItem = (props: StyledTreeItemProps): JSX.Element => {
	const classes = useTreeItemStyles()
	const {
		labelText,
		labelInfo,
		labelIcon,
		color = "#2c2841",
		bgColor = "royalBlue",
		onClick,
		...otherProps
	} = props

	return (
		<TreeItem
			label={
				<div
					className={classes.labelRoot}
					onClick={(event: MouseEvent): void => onClick && onClick(event)}>
					{labelIcon}
					<Typography variant="body2" className={classes.labelText}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</div>
			}
			onClick={onClick}
			// @ts-ignore
			style={{
				"--tree-view-color": color,
				"--tree-view-bg-color": bgColor,
			}}
			classes={{
				root: classes.root,
				content: classes.content,
				expanded: classes.expanded,
				selected: classes.selected,
				group: classes.group,
				label: classes.label,
			}}
			{...otherProps}
		/>
	)
}

export default StyledTreeItem
