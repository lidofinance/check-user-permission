# 👮 Check User Permission

## WARNING

This is a fork with modified behaviour: this workflow will fail straight away if a user has no required permissions.

- Unnecessary functions were also removed eg isBot, isContributor
- Dependency versions were made strict
- Code cleaned up to be quickly auditable
- Yarn lock added

## 🚀 How to use?

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    name: Do something
    steps:
      - uses: lidofinance/check-user-permission@v3
        with:
          require: 'admin'
      - name: Continue
        uses: actions/checkout@v2
```

### Input

| Name    | Desc                                      | Type   | Required |
| ------- | ----------------------------------------- | ------ | -------- |
| token   | GitHub token                              | string | true     |
| require | Which permission level a user should have | string | true     |

- User permission: `admin` > `write` > `read`
