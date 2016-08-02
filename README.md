# Molecular Visualization

## Development
A typical development flow might be to run the example while editing the code, where you'll want any changes to be immediately reflected in the example running in the browser.  In that case you should run:

    npm run example

### Development within another project
If you're using this in another project and want to make changes to this repository locally and see them reflected in your other project, first you'll need to do some setup.  You can point your other project to use the local copy of molecular-visualization like this:

    cd ~/path/to/molecular-visualization
    npm link
    cd ~/path/to/other-project
    npm link molecular-visualization

See [this great blog post](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) for more info on `npm link`.

Once you've linked your other project, you'll need to build molecular-visualization (and likely your other project, too) every time you want your changes to reflect in your other project.  You can do this manually with `npm run build`.  If you want to rebuild molecular-visualization automatically every time a change is made, run `npm run watch`.
