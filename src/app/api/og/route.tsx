import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

const SVG_GRID = `data:image/svg+xml;charset=utf-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0z" fill="none"/><path d="M40 0H0v40" fill="none" stroke="%23ffffff" stroke-opacity="0.04" stroke-width="1"/></svg>`;

const NOISE_BASE64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANwNzcAAAACHRSTlMAMwA0AAYeD0sU8+0AAAB2SURBVDjLpZGxDQAxCAMA/y+tF2Qx2kVKJ7iS4zxyxES7xczb1Y6XyE7TjJzIThPtzI7szA7tzE7szO5E5s7c7Mye7M7uyO7sDkTuRM5E5s7c7Mye7M7uyO7sDkTuRM5E5n+wT+0M2QvI7VwAAAAASUVORK5CYII=`;

const US_FLAG_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXVzIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+CiAgPHBhdGggZmlsbD0iI2JkM2Q0NCIgZD0iTTAgMGg1MTJ2NTEySDAiLz4KICA8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNDAiIGQ9Ik0wIDU4aDUxMk0wIDEzN2g1MTJNMCAyMTZoNTEyTTAgMjk1aDUxMk0wIDM3NGg1MTJNMCA0NTNoNTEyIi8+CiAgPHBhdGggZmlsbD0iIzE5MmY1ZCIgZD0iTTAgMGgzOTB2Mjc1SDB6Ii8+CiAgPG1hcmtlciBpZD0idXMtYSIgbWFya2VySGVpZ2h0PSIzMCIgbWFya2VyV2lkdGg9IjMwIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNSAwIDkuMyAyOC42TDAgMTFoMzBMNS43IDI4LjYiLz4KICA8L21hcmtlcj4KICA8cGF0aCBmaWxsPSJub25lIiBtYXJrZXItbWlkPSJ1cmwoI3VzLWEpIiBkPSJtMCAwIDE4IDExaDY1IDY1IDY1IDY1IDY2TDUxIDM5aDY1IDY1IDY1IDY1TDE4IDY2aDY1IDY1IDY1IDY1IDY2TDUxIDk0aDY1IDY1IDY1IDY1TDE4IDEyMWg2NSA2NSA2NSA2NSA2Nkw1MSAxNDloNjUgNjUgNjUgNjVMMTggMTc3aDY1IDY1IDY1IDY1IDY2TDUxIDIwNWg2NSA2NSA2NSA2NUwxOCAyMzJoNjUgNjUgNjUgNjUgNjZ6Ii8+Cjwvc3ZnPgo=";
const BR_FLAG_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWJyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+CiAgPGcgc3Ryb2tlLXdpZHRoPSIxcHQiPgogICAgPHBhdGggZmlsbD0iIzIyOWU0NSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDUxMnY1MTJIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiNmOGU1MDkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTI2MS40IDQwNS40IDIyOS44LTE0OS4yTDI2MCAxMDYuNmwtMjMwLjcgMTUweiIvPgogICAgPHBhdGggZmlsbD0iIzJiNDlhMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzYxLjUgMjU2YTk3LjIgOTcuMiAwIDEgMS0xOTQuMy0uMiA5Ny4yIDk3LjIgMCAwIDEgMTk0LjMuMiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZmZlZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMjMyLjMgMzE0LjItMy0xLjgtMy4xIDEuNi43LTMuNS0yLjQtMi41IDMuNC0uNCAxLjYtMy4yIDEuNSAzLjMgMy40LjYtMi42IDIuNm02NS43IDIwLTMtMS44LTMuMiAxLjYuNy0zLjUtMi40LTIuNSAzLjUtLjQgMS42LTMuMiAxLjQgMy4zIDMuNC42LTIuNSAyLjRtLTI3LjYtMjIuOS0yLjYtMS41LTIuNyAxLjMuNi0zLTItMi4yIDIuOS0uMyAxLjQtMi43IDEuMiAyLjggMyAuNS0yLjIgMm02Ni4yLTYuNC0yLjYtMS41LTIuNiAxLjMuNi0yLjktMi0yLjEgMi45LS40IDEuMy0yLjYgMS4zIDIuNyAyLjkuNS0yLjIgMm0tNjYuNi0xNi43LTMtMS44LTMuMSAxLjYuNy0zLjUtMi40LTIuNSAzLjQtLjQgMS42LTMuMSAxLjUgMy4yIDMuNC42LTIuNiAyLjRNMTg4IDI0NWwtMy0xLjgtMyAxLjYuNi0zLjUtMi40LTIuNSAzLjUtLjQgMS42LTMuMiAxLjQgMy4zIDMuNC42LTIuNSAyLjRtMTAuMSA0My41LTMtMS43LTMuMSAxLjUuNy0zLjQtMi40LTIuNiAzLjQtLjQgMS42LTMgMS41IDMuMSAzLjQuNy0yLjYgMi4zbTEwMC42LTUxLjMtMi42LTEuNS0yLjggMS4zLjYtMy0yLTIuMyAzLS4zIDEuNC0yLjggMS4zIDIuOSAzIC41LTIuMyAyLjFtLTUgMjkuMkwyOTAgMjU1bC0yLjEgMSAuNC0yLjQtMS42LTEuNyAyLjQtLjMgMS4xLTIuMiAxIDIuMyAyLjQuNC0xLjggMS42bS0xMDguNCAzOC41LTItMS4yLTIuMSAxIC40LTIuMy0xLjYtMS43IDIuNC0uMiAxLTIgMSAyIDIuMy41LTEuNyAxLjZtMTUyLjYgMTEuNS0xLjctLjgtMS43LjcuNC0xLjctMS4zLTEuMyAxLjktLjIuOS0xLjUuNyAxLjYgMS45LjMtMS40IDEuMiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZmZlZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMTgzLjUgMjkyLjMtMi0xLjItMi4xIDEgLjUtMi4zLTEuNy0xLjcgMi4zLS4yIDEuMS0yIDEgMiAyLjMuNS0xLjcgMS42Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmVmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xODMuNSAyOTIuMy0yLTEuMi0yLjEgMSAuNS0yLjMtMS43LTEuNyAyLjMtLjIgMS4xLTIgMSAyIDIuMy41LTEuNyAxLjZtMzIuMiAyLjMtMi0xLjItMiAxIC40LTIuMy0xLjYtMS43IDIuMy0uMiAxLTIuMSAxIDIuMSAyLjMuNS0xLjcgMS42bS0zLjcgMTMtMi0xLjItMiAxIC40LTIuMy0xLjYtMS43IDIuMy0uMyAxLTIgMSAyIDIuMy41LTEuNyAxLjZtNjYuNy0xNy0yLTEuMi0yLjEgMSAuNC0yLjMtMS42LTEuNyAyLjMtLjIgMS4xLTIuMSAxIDIuMSAyLjIuNC0xLjcgMS42bS0xOS4xIDIuNC0yLTEuMi0yLjEgMSAuNS0yLjMtMS42LTEuNyAyLjMtLjIgMS0yLjEgMSAyLjEgMi4zLjQtMS43IDEuNm0tNTIuNS00LjQtMS4yLS43LTEuMy42LjItMS41LTEtMSAxLjUtLjIuNy0xLjMuNSAxLjQgMS41LjItMSAxTTMzMy4yIDMxMGwtMi0xLjEtMi4xIDEgLjUtMi4zLTEuNi0xLjcgMi4zLS4zIDEtMiAxIDIgMi4zLjUtMS43IDEuNm0tMTYgNC40LTEuNi0xLTEuNyAxIC40LTItMS40LTEuNCAyLS4yLjgtMS43LjggMS43IDIgLjQtMS41IDEuM204IDEuOC0xLjYtMS0xLjYuOS4zLTEuOC0xLjItMS4zIDEuOC0uMi44LTEuNi43IDEuNiAxLjguMy0xLjMgMS4zbTIyLjItMTcuNC0xLjUtLjktMS42LjguNC0xLjctMS4yLTEuMyAxLjctLjIuOC0xLjUuNyAxLjYgMS43LjMtMS4zIDEuMk0zMTcgMzIyLjlsLTItMS4xLTIgMSAuNS0yLjItMS42LTEuNSAyLjItLjMgMS4xLTEuOSAxIDIgMi4xLjQtMS42IDEuNG0uNCAxMC45LTEuOC0xLTEuOC45LjQtMi4yLTEuNC0xLjUgMi0uMyAxLTEuOS44IDIgMiAuNC0xLjUgMS40TTMwMi4zIDMxMmwtMS41LS45LTEuNi44LjQtMS44LTEuMi0xLjIgMS43LS4yLjgtMS42LjcgMS42IDEuNy4zLTEuMyAxLjJtLTEzLjUgMS44LTEuNS0uOS0xLjYuOC40LTEuOC0xLjItMS4yIDEuNy0uMi44LTEuNi43IDEuNiAxLjcuMy0xLjIgMS4yTTI2NSAyOTEuNGwtMS41LS45LTEuNi44LjQtMS43LTEuMi0xLjMgMS43LS4yLjgtMS41LjcgMS42IDEuNy4zLTEuMyAxLjFtMi45IDQzLjUtMS4zLS43LTEuMy43LjMtMS41LTEtMSAxLjQtLjMuNy0xLjMuNiAxLjQgMS41LjItMS4xIDFtLTM1LjItNjYtMy0xLjctMy4xIDEuNS43LTMuNC0yLjQtMi42IDMuNC0uNCAxLjYtMy4xIDEuNSAzLjIgMy40LjYtMi42IDIuNCIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzU1LjEgMjkxYTk1IDk1IDAgMCAwIDQuNC0xNS4xYy01MS42LTQ1LjQtMTA5LjItNjguNy0xODItNjMuOWE5NSA5NSAwIDAgMC02LjQgMTUuOSAyMzMgMjMzIDAgMCAxIDE4NCA2M3oiLz4KICAgIDxwYXRoIGZpbGw9IiMzMDllM2EiIGQ9Im0zMzEuOSAyNjUuNCAxLjggMWEzIDMgMCAwIDAtLjIgMS44cS4yLjcgMSAxLjJ0MS42LjZxLjYgMCAxLS42LjItLjMuMS0uN2wtLjMtLjgtMS4yLTEuM2E2IDYgMCAwIDEtMS40LTIuMyAzIDMgMCAwIDEgMS42LTMuMyAzIDMgMCAwIDEgMS43LS4yIDUgNSAwIDAgMSAyIC45IDYgNiAwIDAgMSAyIDIuNCAzIDMgMCAwIDEtLjUgMi42bC0xLjgtMS4xcS4zLS44LjItMS40LS4yLS41LTEtMXQtMS40LS41bC0uNi4zLS4xLjdxMCAuNiAxLjIgMS43bDEuNSAyYTMgMyAwIDAgMS0uMiAzLjIgMyAzIDAgMCAxLTEuNCAxLjEgMyAzIDAgMCAxLTEuOS4yIDYgNiAwIDAgMS0yLjEtMSA1IDUgMCAwIDEtMi0yLjVxLS41LTEuMy40LTNtLTguOC01LjcgMiAxYTMgMyAwIDAgMC0uMiAxLjZxLjIuOCAxIDEuM3QxLjYuNHEuNiAwIDEtLjZsLjEtLjZxMC0uNC0uNC0uOGwtMS4yLTEuM2E2IDYgMCAwIDEtMS41LTIuMiAzIDMgMCAwIDEgLjMtMi40IDMgMyAwIDAgMSAxLjItMSAzIDMgMCAwIDEgMS43LS4ycS45IDAgMiAuOCAxLjYgMSAyIDIuM3EzIDMgMCAwIDEtLjMgMi42bC0xLjktMS4xcS40LS44LjItMS4zdC0xLTFhMiAyIDAgMCAwLTEuNS0uNWwtLjYuNHYuN3EwIC41IDEuMiAxLjd0MS42IDEuOGEzIDMgMCAwIDEtLjEgMy4zIDMgMyAwIDAgMS0zLjIgMS40IDYgNiAwIDAgMS0yLjItLjkgNSA1IDAgMCAxLTIuMS0yLjQgNCA0IDAgMCAxIC4zLTNtLTEwLjgtMyA1LjYtOSA2LjcgNC0xIDEuNi00LjgtMy0xLjMgMiA0LjYgMi44LTEgMS42LTQuNS0yLjgtMS41IDIuNSA1IDMtLjkgMS42em0tMTUuOC0xMi45LjktMS42IDQgMi4yLTEuOSAzLjdhNyA3IDAgMCAxLTQuOC0uNiA2IDYgMCAwIDEtMi4yLTIgNSA1IDAgMCAxLS44LTIuNnEwLTEuNS44LTIuOGE2IDYgMCAwIDEgMi0yLjNxMS4xLS45IDIuNy0uOSAxLjEgMCAyLjUuN2E1IDUgMCAwIDEgMi4zIDIuMnEuNiAxLjIuMyAyLjdsLTIuMS0uNmEyIDIgMCAwIDAtLjItMS41IDMgMyAwIDAgMC0xLjItMS4xIDMgMyAwIDAgMC0yLjQtLjNxLTEgLjUtMiAyYTUgNSAwIDAgMC0uNSAzcS4zIDEuMiAxLjYgMS44bDEuMy40aDEuM2wuNi0xLjJ6bS02OC44LTE3IDEuNi0xMC42IDMuMi41LjggNy41IDMtNyAzLjEuNS0xLjUgMTAuNi0yLS4zIDEuMi04LjMtMy4zIDgtMi0uMy0uOS04LjctMS4yIDguNHptLTEwLjctMS4zIDEtMTAuNiA3LjguNy0uMSAxLjgtNS44LS41LS4yIDIuMyA1LjMuNS0uMSAxLjgtNS4zLS41LS4zIDMgNS45LjUtLjIgMS44eiIvPgogICAgPGcgc3Ryb2tlLW9wYWNpdHk9Ii41Ij4KICAgICAgPHBhdGggZmlsbD0iIzMwOWUzYSIgZD0iTTE4MS40IDIxOC44cTAtMS42LjUtMi43bDEtMS40IDEuNS0xYTYgNiAwIDAgMSAyLjMtLjMgNSA1IDAgMCAxIDMuNyAxLjZxMS40IDEuNSAxLjMgNCAwIDIuNy0xLjUgNGE1IDUgMCAwIDEtMy44IDEuNCA1IDUgMCAwIDEtMy43LTEuNSA1IDUgMCAwIDEtMS4zLTR6Ii8+CiAgICAgIDxwYXRoIGZpbGw9IiNmN2ZmZmYiIGQ9Ik0xODMuNiAyMTguOHEwIDEuOC44IDIuOHQyIDFhMyAzIDAgMCAwIDIuMi0uOXEuOC0uOS45LTIuNyAwLTItLjgtMi44YTMgMyAwIDAgMC0yLTFxLTEuNSAwLTIuMi45LS45LjktMSAyLjd6Ii8+CiAgICA8L2c+CiAgICA8ZyBzdHJva2Utb3BhY2l0eT0iLjUiPgogICAgICA8cGF0aCBmaWxsPSIjMzA5ZTNhIiBkPSJtMTk0IDIyNC40LjEtMTAuN2g0LjVxMS44IDAgMi41LjQgMSAuNCAxLjIgMSAuNC44LjUgMS43IDAgMS4yLS43IDItLjcuNy0yLjIgMSAuOC4zIDEuMi44bDEuMiAxLjggMS4zIDJIMjAxbC0xLjUtMi4zLTEuMi0xLjYtLjYtLjQtMS0uMmgtLjV2NC41eiIvPgogICAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTk2LjIgMjE4LjJoMy42bC41LS41cS4zLS4zLjMtLjh0LS4zLS45bC0uOC0uNGgtMy4yeiIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlLW9wYWNpdHk9Ii41Ij4KICAgICAgPHBhdGggZmlsbD0iIzMwOWUzYSIgZD0ibTIwNi4yIDIxNC4yIDMuOS4yIDIgLjNhNCA0IDAgMCAxIDEuNSAxIDUgNSAwIDAgMSAxIDEuOXEuMyAxIC4yIDIuNWE1IDUgMCAwIDEtMS43IDQuMXEtLjYuNS0xLjUuOGgtMmwtNC0uMXoiLz4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTIwOC4yIDIxNi4xLS4zIDcgMS42LjJoMS4zbC45LS41cS40LS4zLjYtMWwuMy0yLS4xLTEuOHEtLjItLjctLjYtMWwtMS0uNi0xLjctLjJ6Ii8+CiAgICA8L2c+CiAgICA8ZyBzdHJva2Utb3BhY2l0eT0iLjUiPgogICAgICA8cGF0aCBmaWxsPSIjMzA5ZTNhIiBkPSJtMjU4LjUgMjMzLjMgMi41LTEwLjQgMy4zLjhxMiAuNSAyLjUuOC44LjQgMS4yIDEuM3QuMSAyLjJhMyAzIDAgMCAxLTEuOSAyLjNsLTEuMS4zLTIuMi0uNC0xLjQtLjMtMSAzLjl6Ii8+CiAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yNjIuNiAyMjUuMi0uNyAzIDEuMi4ycTEuMi4zIDEuNy4yYTEuNCAxLjQgMCAwIDAgMS4yLTFsLS4xLTEuMS0uOC0uNy0xLjUtLjR6Ii8+CiAgICA8L2c+CiAgICA8ZyBzdHJva2Utb3BhY2l0eT0iLjUiPgogICAgICA8cGF0aCBmaWxsPSIjMzA5ZTNhIiBkPSJtMjY4LjQgMjM2LjMgMy41LTEwLjEgNC4zIDEuNSAyLjIgMXEuNi42LjkgMS41Yy4zLjkgMCAxLjEtLjIgMS43cS0uMyAxLjItMS4zIDEuNmEzIDMgMCAwIDEtMi4zLjNsLjggMS4yLjYgMiAuNSAyLjQtMi40LS44LS43LTIuNy0uNi0xLjktLjQtLjYtMS0uNS0uNC0uMS0xLjUgNC4yeiIvPgogICAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJtMjcyLjQgMjMxLjIgMS41LjUgMS45LjVxLjQgMCAuNy0uMmwuNS0uN3YtMWwtLjYtLjYtMS41LS41LTEuNi0uNnoiLz4KICAgIDwvZz4KICAgIDxnIHN0cm9rZS1vcGFjaXR5PSIuNSI+CiAgICAgIDxwYXRoIGZpbGw9IiMzMDllM2EiIGQ9Ik0yODAuOSAyMzUuOWE3IDcgMCAwIDEgMS4zLTIuNXEuNS0uNyAxLjMtMS4xbDEuNi0uNXExIDAgMi4zLjNhNSA1IDAgMCAxIDMuMiAyLjVxMSAxLjkuMSA0LjNhNiA2IDAgMCAxLTIuNSAzLjUgNSA1IDAgMCAxLTQgLjIgNSA1IDAgMCAxLTMuMi0yLjUgNiA2IDAgMCAxLS4xLTQuMiIvPgogICAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjgzIDIzNi41cS0uNSAxLjYgMCAyLjh0MS44IDEuNnExLjIuMyAyLjItLjN0MS43LTIuNHEuNC0xLjcgMC0yLjlhMyAzIDAgMCAwLTEuOC0xLjUgMyAzIDAgMCAwLTIuMy4zcS0xIC42LTEuNiAyLjQiLz4KICAgIDwvZz4KICAgIDxnIHN0cm9rZS1vcGFjaXR5PSIuNSI+CiAgICAgIDxwYXRoIGZpbGw9IiMzMDllM2EiIGQ9Im0zMDEuNyAyNTAuOCA0LjktOS41IDQgMnExLjUuOSAyIDEuNC42LjcuNyAxLjUuMiAxLS40IDEuNy0uNCAxLTEuNSAxLjUtMSAuMy0yLjMtLjEuNC42LjYgMS4zbC4zIDIuMS4yIDIuNS0yLjMtMS4yLS4zLTIuOC0uMy0yLS40LS42LS45LS42LS40LS4yLTIgNHoiLz4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMwNi40IDI0Ni4zIDEuNC43IDEuOC44cS40IDAgLjctLjJhMiAyIDAgMCAwIC44LTEuNWwtLjYtLjctMS4zLS44LTEuNS0uN3oiLz4KICAgIDwvZz4KICAgIDxnIHN0cm9rZS1vcGFjaXR5PSIuNSI+CiAgICAgIDxwYXRoIGZpbGw9IiMzMDllM2EiIGQ9Ik0zNDEuMiAyNzAuM3EuOC0xLjQgMi0ybDEuNi0uN2gxLjZxMS4xLjEgMi4yIDFhNSA1IDAgMCAxIDIuMyAzLjMgNiA2IDAgMCAxLTEuMSA0LjEgNiA2IDAgMCAxLTMuNSAyLjYgNSA1IDAgMCAxLTMuOS0uOSA1IDUgMCAwIDEtMi4zLTMuMyA2IDYgMCAwIDEgMS00LjF6Ii8+CiAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNDMgMjcxLjRxLTEgMS42LS44IDIuOGEzIDMgMCAwIDAgMS4zIDIgMyAzIDAgMCAwIDIuMi40cTEuMi0uMyAyLjMtMS45dC44LTIuN3EwLTEuMS0xLjItMmMtMS4yLS45LTEuNS0uNi0yLjMtLjRxLTEuMi4zLTIuMiAxLjh6Ii8+CiAgICA8L2c+CiAgICA8cGF0aCBmaWxsPSIjMzA5ZTNhIiBkPSJtMjQ2LjQgMjI5IDEuNy03LjYgNS42IDEuMy0uMyAxLjMtNC0xLS40IDEuNyAzLjcuOS0uMyAxLjMtMy43LTEtLjUgMi4xIDQuMiAxLS4zIDEuM3oiLz4KICA8L2c+Cjwvc3ZnPgo=";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Victor Rocha";
  const description = searchParams.get("description") ?? "";
  const type = (searchParams.get("type") ?? "page") as "blog" | "work" | "page";
  const tag = searchParams.get("tag") ?? "";

  const date = searchParams.get("date");
  const readTime = searchParams.get("readTime");

  const BG = "#09090E";
  const CARD_BG = "#12121A";
  const VIOLET = "#8B5CF6";
  const CYAN = "#00E5FF";
  const TEXT_STRONG = "#FFFFFF";
  const TEXT_WEAK = "#A1A1AA";

  const typeLabel: Record<string, string> = {
    blog: "Artigo",
    work: "Estudo de Caso",
    page: "Portfólio",
  };

  const ctaText: Record<string, string> = {
    blog: "Ler Artigo",
    work: "Ver Projeto",
    page: "Acessar Portfólio",
  };

  const titleFontSize =
    title.length > 60 ? "52px" : title.length > 35 ? "64px" : "76px";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        backgroundColor: BG,
        backgroundImage: `url('${SVG_GRID}')`,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${NOISE_BASE64}')`,
          backgroundRepeat: "repeat",
          opacity: 0.15,
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${VIOLET}40 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-200px",
          width: "700px",
          height: "700px",
          background: `radial-gradient(circle, ${CYAN}30 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1080px",
          height: "540px",
          padding: "48px 56px",
          borderRadius: "32px",
          backgroundColor: CARD_BG,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Topo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: CYAN,
                  background: "rgba(0, 229, 255, 0.1)",
                  border: `1px solid rgba(0, 229, 255, 0.3)`,
                  padding: "8px 20px",
                  borderRadius: "6px",
                }}
              >
                {typeLabel[type] || "Portfólio"}
              </span>
              {tag && (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: VIOLET,
                    background: "rgba(139, 92, 246, 0.1)",
                    border: `1px solid rgba(139, 92, 246, 0.3)`,
                    padding: "8px 20px",
                    borderRadius: "6px",
                  }}
                >
                  {tag}
                </span>
              )}
            </div>

            {(date || readTime) && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.15)",
                    fontSize: "22px",
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
                {date && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: CYAN,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {date}
                  </span>
                )}
                {date && readTime && (
                  <span style={{ color: VIOLET, fontSize: "16px" }}>•</span>
                )}
                {readTime && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: TEXT_WEAK,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {readTime} min read
                  </span>
                )}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                color: TEXT_WEAK,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              EN / PT
            </span>
            <img
              src={US_FLAG_BASE64}
              width="28"
              height="28"
              style={{ borderRadius: "50%", opacity: 0.9 }}
            />
            <img
              src={BR_FLAG_BASE64}
              width="28"
              height="28"
              style={{ borderRadius: "50%", opacity: 0.9 }}
            />
          </div>
        </div>

        {/* MEIO FLEXÍVEL: Ocupa todo o resto do espaço e centraliza */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.15,
              color: TEXT_STRONG,
              letterSpacing: "-0.03em",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: "26px",
                lineHeight: 1.5,
                color: TEXT_WEAK,
                fontWeight: 500,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Rodapé */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: `1px solid rgba(255,255,255,0.08)`,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${VIOLET}, ${CYAN})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              VR
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: TEXT_STRONG,
                }}
              >
                Victor Rocha
              </span>
              <span
                style={{ fontSize: "16px", color: TEXT_WEAK, fontWeight: 500 }}
              >
                strattegia.dev
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: `linear-gradient(135deg, ${VIOLET}, #3B82F6)`,
              padding: "16px 36px",
              borderRadius: "100px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              {ctaText[type]}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "4px" }}
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>,
    {
      ...SIZE,
      headers: {
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400",
      },
    },
  );
}
