var setShips = function() {
	return [
		{
			"type": "battleship",
			"size": 5,
			"orientation": "horizontal",
			"hull": [
				{
					"location": {
						"x": 1,
						"y": 6
					},
					"hit": false
				},
				{
					"location": {
						"x": 2,
						"y": 6
					},
					"hit": false
				},
				{
					"location": {
						"x": 3,
						"y": 6
					},
					"hit": false
				},
				{
					"location": {
						"x": 4,
						"y": 6
					},
					"hit": false
				},
				{
					"location": {
						"x": 5,
						"y": 6
					},
					"hit": false
				}
			],
			"id": 0
		},
		{
			"type": "destroyer",
			"size": 4,
			"orientation": "horizontal",
			"hull": [
				{
					"location": {
						"x": 5,
						"y": 4
					},
					"hit": false
				},
				{
					"location": {
						"x": 6,
						"y": 4
					},
					"hit": false
				},
				{
					"location": {
						"x": 7,
						"y": 4
					},
					"hit": false
				},
				{
					"location": {
						"x": 8,
						"y": 4
					},
					"hit": false
				}
			],
			"id": 1
		},
		{
			"type": "destroyer",
			"size": 4,
			"orientation": "vertical",
			"hull": [
				{
					"location": {
						"x": 7,
						"y": 5
					},
					"hit": false
				},
				{
					"location": {
						"x": 7,
						"y": 6
					},
					"hit": false
				},
				{
					"location": {
						"x": 7,
						"y": 7
					},
					"hit": false
				},
				{
					"location": {
						"x": 7,
						"y": 8
					},
					"hit": false
				}
			],
			"id": 2
		}
	];
};
