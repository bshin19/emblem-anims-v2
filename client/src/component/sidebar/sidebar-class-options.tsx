import React, { ReactElement, forwardRef } from "react"
import {
	FormLabel,
	FormControlLabel,
	FormControl,
	Radio,
	RadioGroup,
	makeStyles,
	createStyles,
	Typography,
} from "@material-ui/core"

export enum SidebarClassOptionsValues {
	Tier = "tier",
	Category = "category",
	Alphabetical = "alphabetical",
}

interface SidebarClassOptionsProps {
	option: SidebarClassOptionsValues
	setOption: React.Dispatch<React.SetStateAction<SidebarClassOptionsValues>>
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			paddingLeft: "12px",
		},
		radioText: {
			fontSize: "10px",
		},
		optionsRadio: {
			padding: "3px",
		},
		formLabelRoot: {
			color: "#3f51b5",
		},
	})
)

const BaseSidebarClassOptions = (
	{ option, setOption }: SidebarClassOptionsProps,
	ref: any
): ReactElement => {
	const classes = useStyles()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setOption(event.target.value as SidebarClassOptionsValues)
	}

	return (
		<FormControl component="fieldset" className={classes.root}>
			<FormLabel component="legend" classes={{ root: classes.formLabelRoot }}>
				<Typography variant="body2">Sort Classes</Typography>
			</FormLabel>
			<RadioGroup
				aria-label="Sort Class Options"
				name="Class"
				value={option}
				onChange={handleChange}>
				<FormControlLabel
					classes={{ label: classes.radioText }}
					control={
						<Radio
							className={classes.optionsRadio}
							color="primary"
							size="small"
						/>
					}
					label={SidebarClassOptionsValues.Tier}
					value={SidebarClassOptionsValues.Tier}
				/>
				<FormControlLabel
					classes={{ label: classes.radioText }}
					control={
						<Radio
							className={classes.optionsRadio}
							color="primary"
							size="small"
						/>
					}
					label={SidebarClassOptionsValues.Category}
					value={SidebarClassOptionsValues.Category}
				/>
				<FormControlLabel
					classes={{ label: classes.radioText }}
					control={
						<Radio
							className={classes.optionsRadio}
							color="primary"
							size="small"
						/>
					}
					label={SidebarClassOptionsValues.Alphabetical}
					value={SidebarClassOptionsValues.Alphabetical}
				/>
			</RadioGroup>
		</FormControl>
	)
}

export const SidebarClassOptions = forwardRef(BaseSidebarClassOptions)
