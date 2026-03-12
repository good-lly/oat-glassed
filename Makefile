# oat - Build System

.PHONY: dist css js clean size publish

CSS_FILES = src/css/00-base.css \
            src/css/01-theme.css \
            src/css/animations.css \
            src/css/button.css \
            src/css/form.css \
            src/css/table.css \
            src/css/progress.css \
            src/css/spinner.css \
            src/css/grid.css \
            src/css/card.css \
            src/css/alert.css \
            src/css/badge.css \
            src/css/accordion.css \
            src/css/tabs.css \
            src/css/dialog.css \
            src/css/dropdown.css \
            src/css/toast.css \
            src/css/sidebar.css \
            src/css/skeleton.css \
            src/css/tooltip.css \
            src/css/nav.css \
            src/css/tag.css \
            src/css/avatar.css \
            src/css/empty-state.css \
            src/css/command.css \
            src/css/utilities.css

dist: css js size

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/oat-glassed.css
	@npx esbuild dist/oat-glassed.css --minify --outfile=dist/oat-glassed.min.css
	@gzip -9 -k -f dist/oat-glassed.min.css
	@cp dist/oat-glassed.min.css docs/static/oat-glassed.min.css
	@echo "CSS: $$(wc -c < dist/oat-glassed.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@npx esbuild src/js/index.js --bundle --format=iife --outfile=dist/oat-glassed.js
	@npx esbuild src/js/index.js --bundle --format=iife --minify --outfile=dist/oat-glassed.min.js
	@gzip -9 -k -f dist/oat-glassed.min.js
	@cp dist/oat-glassed.min.js docs/static/oat-glassed.min.js
	@echo "JS: $$(wc -c < dist/oat-glassed.min.js | tr -d ' ') bytes (minified)"

clean:
	@rm -rf dist

size:
	@echo ""
	@echo "Bundle:"
	@echo "CSS (src):   $$(wc -c < dist/oat-glassed.css | tr -d ' ') bytes"
	@echo "CSS (min):   $$(wc -c < dist/oat-glassed.min.css | tr -d ' ') bytes"
	@echo "CSS (gzip):  $$(wc -c < dist/oat-glassed.min.css.gz | tr -d ' ') bytes"
	@echo ""
	@echo "JS (src):    $$(wc -c < dist/oat-glassed.js | tr -d ' ') bytes"
	@echo "JS (min):    $$(wc -c < dist/oat-glassed.min.js | tr -d ' ') bytes"
	@echo "JS (gzip):   $$(wc -c < dist/oat-glassed.min.js.gz | tr -d ' ') bytes"

publish: clean dist
	@cp -r src/css dist/css
	@cp -r src/js dist/js
	@cp README.md dist/README.md
	@cp LICENSE dist/LICENSE
	@VERSION=$$(git describe --tags --abbrev=0 | sed 's/^v//') && \
		sed 's/"version-0.0.0"/"'"$$VERSION"'"/' package.json > dist/package.json
	@cd dist && npm publish --access public
