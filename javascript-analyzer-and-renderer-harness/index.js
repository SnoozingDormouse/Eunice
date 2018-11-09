const
	createJavascriptInputResizableColumn = require("@devsnicket/eunice-javascript-analyzer/harness/createJavascriptInputResizableColumn"),
	createYamlAndSvgResizableColumns = require("../Renderer/harness/createYamlAndSvgResizableColumns"),
	getYamlFromJavaScript =	require("@devsnicket/eunice-javascript-analyzer/getYamlFromJavaScript"),
	renderHarness = require("@devsnicket/eunice-test-harnesses/renderHarness");

renderHarness({
	createColumns:
		({
			columnFactory,
			stateful,
		}) =>
			[
				createJavascriptInputResizableColumn({
					createResizableColumnForInput: columnFactory.createResizableColumnForInput,
					createStateFromValue: value => ({ yaml: getYamlFromJavaScript(value) }),
					state: stateful.state,
				}),
				...createYamlAndSvgResizableColumns({
					columnFactory,
					stateful,
				}),
			],
	initialState:
		// javascriptFromWebpack is replaced with literal by webpack.config.js
		// eslint-disable-next-line no-undef
		createInitialStateFromJavascript(javascriptFromWebpack),
});

function createInitialStateFromJavascript(
	javascript,
) {
	return (
		{
			javascript,
			yaml: getYamlFromJavaScript(javascript),
		}
	);
}