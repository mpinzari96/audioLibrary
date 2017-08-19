import { observable, computed } from "mobx"


export default class FilterOptions{
	@observable sortOrder = ""	
	@observable sortName = ""	

	constructor(sortName){
		this.sortOrder = "desc"	
		this.sortName = sortName || ""	
	}
	@computed get filter(){
		let filter = 
			{ "include": 
				{	"relation":"coordinator", 
				    	"scope": 
						{"where": { "coordinatorId": 1} } } }

		if(this.sortName && this.sortOrder)
			filter.order = `${this.sortName} ${this.sortOrder}`

		return filter
	}
}