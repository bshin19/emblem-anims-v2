import React from "react"
import { NavigationSearch } from "./navigation-search"
import { shallow } from "enzyme"

it("renders without crashing", (): void => {
	const wrapper = shallow(<NavigationSearch />)
	expect(wrapper).toContain("form")
})
