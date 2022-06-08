# 3s1t editor

- Open Source
- Browser Based
- Integrated Development Environment (IDE)

## Quick Start

- clone repo
- `npm i --legacy-peer-deps`
- `npm run dev`

## Contributing

- Create feature branch
  - Create issue (or choose one from [existing issue](https://github.com/3s1t/editor/issues))
  - On issue page select `Development` > `Create a branch`
  - Click `Create Branch`
  - Copy fetch + checkout commands and run locally
- Make and commit your changes
- Create PR
  - Push feature branch to the [3s1t/editor github repo](https://github.com/3s1t/editor)
  - CI
    - Jest unit tests run
    - Vercel creates a [preview deployment](https://vercel.com/docs/concepts/deployments/environments#preview)
- Pre-requisites before merge
  - CI checks pass
  - Description is thorough yet concise (bullet points, images, gifs, data)
  - Approval is needed from someone in the [3s1t github organization](https://github.com/orgs/3s1t/people)

## Example Routes

- 3s1t.xyz
  - /{project_id}
    - /edit
      - /explorer - can select all models (shapes + engine parts) from Secondary nav bar
      - /search - placeholder text
      - /source control - placeholder text
      - /extensions - placeholder text
    - /view
      - /explorer - placeholder text
      - /search - placeholder text
      - /extensions - placeholder text
- searchParams
  - ?tabTreeId={tabTreeId}
