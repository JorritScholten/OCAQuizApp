# React dev tool decision: the use of vite

## status: accepted

## Context and Problem Statement

We need to make a decision to include a tool to increase productivity in development.

## Decision Considerations

- Ease of use 
- improving speed of development
- focus on efficiency 
- decrease downtime
- avoid unneccecary workload
- flexibility
- js/ jsx support

##Considered Options

- Create-react-app 

- Vue cli

- Esbuild

- Snowpack

## Decision Outcome


After evaluating every option vite has been chosen as dev tool.

Vite is incredibly fast in both build and development, and therefore will improve the efficiency of the workflow massively.

## Consequences 

### Positives

The opinionated nature(optimized producton build) of Vite makes it a serious competitor with the current popular tooling. A lot of work has been done to make the developer experience really seamless and make production-ready builds out of the box.

#### Speed

Vite is atleast 10 times faster than webpack-based tools because of its own development server, that uses native es modules in the browser.

#### Optimized production build

Its zero-config optimized production build will enable us to get from zero to production without any configuration.


### Negatives

Rollup is used for its build (you might want to use a different build tool).
Does not support streaming imports(unlike snowpack).

Vite will therefore be a incredible tool for improving efficiency and development experience.

## Conclusion

We will use vite as a dev tool to support our react application.



