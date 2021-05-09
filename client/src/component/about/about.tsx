import React, { ReactElement } from "react"
import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	Grid,
	Link,
} from "@material-ui/core"

export const About = (): ReactElement => (
	// About container
	<aside className="about">
		{/* Card */}
		<Card>
			<CardContent>
				<Typography align="center" variant="h5" component="h2">
					About
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" component="p">
							This site provides a method to view and download nearly all
							animations created for the Fire Emblem GBA games.
						</Typography>
						<List>
							<ListItem dense>Select animations to view by category.</ListItem>
							<ListItem dense>
								Clicking on an image causes it to animate.
							</ListItem>
							<ListItem dense>
								Clicking a weapon icon will swap to that weapon for viewing.
							</ListItem>
							<ListItem dense>
								Clicking an anim name will download the package with all usable
								animations.
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" component="p" gutterBottom>
							Please note that class names are a guideline.
						</Typography>
						<Typography variant="body2" component="p" gutterBottom>
							Unnamed classes have been placed under the most similar type of
							class.
						</Typography>
						<Typography variant="body2" component="p" gutterBottom>
							The entire repo is available on{" "}
							<Link href="https://drive.google.com/open?id=1jiiTpNXgAlr4lZBh8d-nJFdO-Jus5VXV">
								Google Drive
							</Link>
							.
						</Typography>
						<Typography variant="body2" component="span">
							Additional assets can also be found in the repo, such as:
							<List dense>
								<ListItem dense>
									<Link href="https://drive.google.com/open?id=1ecVyUKYgLNhg94STOaQ5cJIa6U9gFDwf">
										Class Cards
									</Link>
								</ListItem>
								<ListItem dense>
									<Link href="https://drive.google.com/open?id=1ekz8LrSXK3cnnIiCYNOfuqgy3eRxGVJM">
										Map Sprites
									</Link>
								</ListItem>
								<ListItem dense>
									<Link href="https://drive.google.com/open?id=1a6ho69W7iXW1l3zKyYYpKJEtt9zk_iKs">
										Weapon Icons
									</Link>
								</ListItem>
								<ListItem dense>
									<Link href="https://drive.google.com/open?id=1J7OCF6ey0D_GUcbhK-BUwhHShs5txijw">
										Music
									</Link>
								</ListItem>
							</List>
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>

		{/* Card Header -- Standard + New Button */}

		{/* Card Body -- Unique */}
	</aside>
)
