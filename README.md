# Birds of Østfold

![image](https://github.com/Noroff-FEU-Assignments/project-exam-2-Soph-H-P/blob/master/src/svgs/site-preview.png?raw=true)

In this project I had to create a react app with
[Link to live site](https://birds-of-ostfold.netlify.app/)

## Description

This is a simple app built using React with Typescript and Styled-Components.
The Birds of Østfold site allows users to log bird sightings in their area as well as viewing
other peoples sightings.

A user can login which will give special access to 'members only' bird sightings and to keep a log of their
own sightings. They will also gain rank the more sightings they log. The hightest being a gold ranking birder.
For a test public user:
email: public@public.com
password: Pass1234

Admins for the site have the ability to add sightings themself, they can also moderate other peoples sightings.
Before a sighting is available to the public it must be varified by an admin. An admin can also choose to delete a
sighting if they deem it necessary.

Admins can also add, edit and delete events that are happening in the area.

Admins can edit a users status giving admin status, or deleting a user.
For a test admin user:
email: admin@admin.com
password: Pass1234

## Built With

I used the following tech stack:

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled components](https://styled-components.com/)
- [Strapi backend](https://strapi.io/)

## To run and install

### Node version

Please use node version <= 16

1. Clone the repo:

```bash
git clone git@github.com:Noroff-FEU-Assignments/project-exam-2-Soph-H-P.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following commands:

```bash
npm run start
```

Great you should be good to go!

## Backend

The backend for development is currently running on the remote server with Strapi, Heroku and Coludinary

## Contributing

To contribute to this project please create a new branch which can then be reviewed and merged.

## Contact

[My LinkedIn page](https://www.linkedin.com/in/smphaugland/)

## Credits

Thanks to the members of Fugler i Østfold for their help giving feedback on designs and testing the site.

Special thanks to Connor O'Brien for helping to sort an authentication issue with the strapi backend.
