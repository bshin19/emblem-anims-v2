import React, { ReactNode, FC } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import TreeView from "@material-ui/lab/TreeView"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"

const useStyles = makeStyles(
	createStyles({
		root: {
			height: 264,
			flexGrow: 1,
			maxWidth: 400,
			padding: "1px 6px 0 0",
		},
	})
)

interface StyledTreeViewProps {
	children: ReactNode
}

const StyledTreeView: FC<StyledTreeViewProps> = ({ children }) => {
	const classes = useStyles()

	return (
		// @ts-ignore
		<TreeView
			className={classes.root}
			defaultExpanded={["3"]}
			defaultCollapseIcon={<ArrowDropDownIcon />}
			defaultExpandIcon={<ArrowRightIcon />}
			defaultEndIcon={<div style={{ width: 24 }} />}>
			{children}
		</TreeView>
	)
}

export default StyledTreeView
