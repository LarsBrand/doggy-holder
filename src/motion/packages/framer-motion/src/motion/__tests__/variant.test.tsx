import {
    pointerDown,
    pointerEnter,
    pointerUp,
    render,
} from "../../../jest.setup"
import { motion, MotionConfig, useMotionValue } from "../../"
import * as React from "react"
import { Variants } from "../../types"
import { motionValue } from "../../value"
import { useState } from "react"
import { nextFrame } from "../../gestures/__tests__/utils"

describe("animate prop as variant", () => {
    test("animates to set variant", async () => {
        const variants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 100, transition: { type: false } },
        }

        const promise = new Promise((resolve) => {
            const x = motionValue(0)
            const onComplete = () => resolve(x.get())
            const { rerender } = render(
                <motion.div
                    animate="visible"
                    variants={variants}
                    style={{ x }}
                    onAnimationComplete={onComplete}
                />
            )
            rerender(
                <motion.div
                    animate="visible"
                    variants={variants}
                    style={{ x }}
                    onAnimationComplete={onComplete}
                />
            )
        })

        return expect(promise).resolves.toBe(100)
    })

    test("fires onAnimationStart when animation begins", async () => {
        const promise = new Promise((resolve) => {
            const onStart = jest.fn()
            const onComplete = () => resolve(onStart)
            const Component = () => (
                <motion.div
                    animate="visible"
                    transition={{ type: false }}
                    onAnimationStart={onStart}
                    onAnimationComplete={onComplete}
                />
            )
            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBeCalledTimes(1)
    })

    test("fires onAnimationStart with the animation definition", async () => {
        const promise = new Promise((resolve) => {
            const onStart = jest.fn()
            const onComplete = () => resolve(onStart)
            const Component = () => (
                <motion.div
                    animate="visible"
                    transition={{ type: false }}
                    onAnimationStart={(definition) => onStart(definition)}
                    onAnimationComplete={onComplete}
                />
            )
            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBeCalledWith("visible")
    })

    test("child animates to set variant", async () => {
        const variants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 100, transition: { type: false } },
        }

        const childVariants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 50, transition: { type: false } },
        }

        const promise = new Promise((resolve) => {
            const x = motionValue(0)
            const onComplete = () => resolve(x.get())
            const Component = () => (
                <motion.div
                    animate="visible"
                    variants={variants}
                    onAnimationComplete={onComplete}
                >
                    <motion.div variants={childVariants} style={{ x }} />
                </motion.div>
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe(50)
    })

    test("child animates to set variant even if variants are not found on parent", async () => {
        const childVariants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 50, transition: { type: false } },
        }

        const promise = new Promise((resolve) => {
            const x = motionValue(0)
            const onComplete = () => resolve(x.get())
            const Component = () => (
                <motion.div animate="visible" onAnimationComplete={onComplete}>
                    <motion.div variants={childVariants} style={{ x }} />
                </motion.div>
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe(50)
    })

    test("applies applyOnEnd if set on initial", () => {
        const variants: Variants = {
            visible: {
                background: "#f00",
                transitionEnd: { display: "none" },
            },
        }

        const { container } = render(
            <motion.div variants={variants} initial="visible" />
        )
        expect(container.firstChild).toHaveStyle("display: none")
    })

    test("applies applyOnEnd and end of animation", async () => {
        const promise = new Promise((resolve) => {
            const variants: Variants = {
                hidden: { background: "#00f" },
                visible: {
                    background: "#f00",
                    transitionEnd: { display: "none" },
                },
            }
            const display = motionValue("block")
            const onComplete = () => resolve(display.get())
            const Component = () => (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{ type: false }}
                    onAnimationComplete={onComplete}
                    style={{ display }}
                />
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe("none")
    })

    test("accepts custom transition", async () => {
        const promise = new Promise((resolve) => {
            const variants: Variants = {
                hidden: { background: "#00f" },
                visible: {
                    background: "#f00",
                    transition: { from: "#555", ease: () => 0.5 },
                },
            }
            const background = motionValue("#00f")
            const onComplete = () => resolve(background.get())
            const Component = () => (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{ type: false }}
                    onUpdate={onComplete}
                    style={{ background }}
                />
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe("rgba(190, 60, 60, 1)")
    })

    test("respects orchestration props in transition prop", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0)

            const { getByTestId } = render(
                <motion.div
                    variants={{
                        visible: {
                            opacity: 1,
                        },
                        hidden: {
                            opacity: 0,
                        },
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ type: false, delayChildren: 1 }}
                >
                    <motion.div
                        data-testid="test"
                        variants={{
                            visible: {
                                opacity: 0.9,
                            },
                            hidden: {
                                opacity: 0,
                            },
                        }}
                        transition={{ type: false }}
                        style={{ opacity }}
                    />
                </motion.div>
            )

            requestAnimationFrame(() => resolve(getByTestId("test")))
        })

        return expect(promise).resolves.toHaveStyle("opacity: 0")
    })

    test("delay propagates throughout children", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0)
            const variants: Variants = {
                visible: {
                    opacity: 1,
                },
                hidden: {
                    opacity: 0,
                },
            }

            function Component() {
                return (
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ type: false, delayChildren: 1 }}
                    >
                        <motion.div
                            variants={variants}
                            transition={{ type: false }}
                        >
                            <motion.div
                                variants={variants}
                                style={{ opacity }}
                            />
                        </motion.div>
                    </motion.div>
                )
            }

            const { rerender } = render(<Component />)
            rerender(<Component />)

            setTimeout(() => resolve(opacity.get()), 300)
        })

        return expect(promise).resolves.toBe(0)
    })

    test("propagates through components with no `animate` prop", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0)
            const variants: Variants = {
                visible: {
                    opacity: 1,
                },
            }

            render(
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ type: false }}
                >
                    <motion.div>
                        <motion.div
                            variants={variants}
                            transition={{ type: false }}
                            style={{ opacity }}
                        />
                    </motion.div>
                </motion.div>
            )

            requestAnimationFrame(() => resolve(opacity.get()))
        })

        return expect(promise).resolves.toBe(1)
    })

    test("doesn't propagate to a component with its own `animate` prop", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(1)

            const parentVariants = {
                initial: {
                    x: 0,
                },
                animate: {
                    x: 100,
                },
            }

            const childVariants = {
                initial: {
                    opacity: 0,
                },
                animate: {
                    opacity: 1,
                },
            }

            render(
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={parentVariants}
                    transition={{ duration: 0.05 }}
                >
                    <motion.div
                        animate="initial"
                        variants={childVariants}
                        style={{ opacity }}
                        transition={{ duration: 0.05 }}
                    />
                </motion.div>
            )

            setTimeout(() => resolve(opacity.get()), 100)
        })

        return expect(promise).resolves.toBe(0)
    })

    test("when: beforeChildren works correctly", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0.1)
            const variants: Variants = {
                visible: {
                    opacity: 1,
                    transition: { duration: 1, when: "beforeChildren" },
                },
            }

            render(
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div>
                        <motion.div variants={variants} style={{ opacity }} />
                    </motion.div>
                </motion.div>
            )

            setTimeout(() => resolve(opacity.get()), 200)
        })

        return expect(promise).resolves.toBe(0.1)
    })

    test("when: afterChildren works correctly", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0.1)
            const variants: Variants = {
                visible: {
                    opacity: 1,
                },
            }

            render(
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1, when: "afterChildren" }}
                    style={{ opacity }}
                >
                    <motion.div>
                        <motion.div
                            variants={variants}
                            transition={{ duration: 1 }}
                        />
                    </motion.div>
                </motion.div>
            )

            setTimeout(() => resolve(opacity.get()), 200)
        })

        return expect(promise).resolves.toBe(0.1)
    })

    test("initial: false correctly propagates", async () => {
        const promise = new Promise((resolve) => {
            const opacity = motionValue(0.5)

            render(
                <motion.div initial={false} animate="visible">
                    <motion.div>
                        <motion.div
                            variants={{
                                visible: { opacity: 0.9 },
                                hidden: { opacity: 0 },
                            }}
                            style={{ opacity }}
                        />
                    </motion.div>
                </motion.div>
            )

            setTimeout(() => resolve(opacity.get()), 200)
        })

        return expect(promise).resolves.toBe(0.9)
    })

    test("initial=false doesn't propagate to props", async () => {
        const { getByTestId } = render(
            <motion.div initial={false} animate="test">
                <motion.div data-testid="child" animate={{ opacity: 0.4 }} />
            </motion.div>
        )

        expect(getByTestId("child")).not.toHaveStyle("opacity: 0.4")
    })

    test("nested controlled variants switch correctly", async () => {
        const promise = new Promise((resolve) => {
            const parentOpacity = motionValue(0.2)
            const childOpacity = motionValue(0.1)

            const Component = ({ isOpen }: { isOpen: boolean }) => {
                return (
                    <motion.div
                        variants={{
                            visible: { opacity: 0.3 },
                            hidden: { opacity: 0.4 },
                        }}
                        initial="hidden"
                        animate={isOpen ? "visible" : "hidden"}
                        transition={{ type: false }}
                        style={{ opacity: parentOpacity }}
                    >
                        <motion.div
                            variants={{
                                visible: { opacity: 0.5 },
                                hidden: { opacity: 0.6 },
                            }}
                            initial="hidden"
                            transition={{ type: false }}
                            animate={isOpen ? "visible" : "hidden"}
                            style={{ opacity: childOpacity }}
                        />
                    </motion.div>
                )
            }

            const { rerender } = render(<Component isOpen={false} />)
            setTimeout(() => {
                expect(parentOpacity.get()).toBe(0.4)
                expect(childOpacity.get()).toBe(0.6)

                rerender(<Component isOpen />)

                setTimeout(() => {
                    resolve([parentOpacity.get(), childOpacity.get()])
                }, 0)
            }, 0)
        })

        return expect(promise).resolves.toEqual([0.3, 0.5])
    })

    test("Child variants correctly calculate delay based on staggerChildren", async () => {
        const isCorrectlyStaggered = await new Promise((resolve) => {
            const childVariants = {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.1 } },
            }

            function Component() {
                const a = useMotionValue(0)
                const b = useMotionValue(0)

                React.useEffect(
                    () =>
                        a.on("change", (latest) => {
                            if (latest >= 1 && b.get() === 0) resolve(true)
                        }),
                    [a, b]
                )

                return (
                    <motion.div
                        variants={{
                            hidden: {},
                            visible: {
                                x: 100,
                                transition: { staggerChildren: 0.15 },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={childVariants}
                            style={{ opacity: a }}
                        />
                        <motion.div
                            variants={childVariants}
                            style={{ opacity: b }}
                        />
                    </motion.div>
                )
            }

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        expect(isCorrectlyStaggered).toBe(true)
    })

    test("Child variants with value-specific transitions correctly calculate delay based on staggerChildren", async () => {
        const isCorrectlyStaggered = await new Promise((resolve) => {
            const childVariants = {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { opacity: { duration: 0.1 } },
                },
            }

            function Component() {
                const a = useMotionValue(0)
                const b = useMotionValue(0)

                React.useEffect(
                    () =>
                        a.on("change", (latest) => {
                            if (latest >= 1 && b.get() === 0) resolve(true)
                        }),
                    [a, b]
                )

                return (
                    <motion.div
                        variants={{
                            hidden: {},
                            visible: {
                                x: 100,
                                transition: { staggerChildren: 0.15 },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={childVariants}
                            style={{ opacity: a }}
                        />
                        <motion.div
                            variants={childVariants}
                            style={{ opacity: b }}
                        />
                    </motion.div>
                )
            }

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        expect(isCorrectlyStaggered).toBe(true)
    })

    test("components without variants are transparent to stagger order", async () => {
        const [recordedOrder, staggeredEqually] = await new Promise(
            (resolve) => {
                const order: number[] = []
                const delayedBy: number[] = []
                const staggerDuration = 0.1

                const updateDelayedBy = (i: number) => {
                    if (delayedBy[i]) return
                    delayedBy[i] = performance.now()
                }

                // Checking a rough equidistance between stagger times allows us to see
                // if any of the supposedly invisible interim `motion.div`s were considered part of the
                // stagger order (which would mess up the timings)
                const checkStaggerEquidistance = () => {
                    let isEquidistant = true
                    let prev = 0
                    for (let i = 0; i < delayedBy.length; i++) {
                        if (prev) {
                            const timeSincePrev = prev - delayedBy[i]
                            if (
                                Math.round(timeSincePrev / 100) * 100 !==
                                staggerDuration * 1000
                            ) {
                                isEquidistant = false
                            }
                        }
                        prev = delayedBy[i]
                    }

                    return isEquidistant
                }

                const parentVariants: Variants = {
                    visible: {
                        transition: {
                            staggerChildren: staggerDuration,
                            staggerDirection: -1,
                        },
                    },
                }

                const variants: Variants = {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            duration: 0.000001,
                        },
                    },
                }

                render(
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={parentVariants}
                        onAnimationComplete={() =>
                            requestAnimationFrame(() =>
                                resolve([order, checkStaggerEquidistance()])
                            )
                        }
                    >
                        <motion.div>
                            <motion.div />
                            <motion.div
                                variants={variants}
                                onUpdate={() => {
                                    updateDelayedBy(0)
                                    order.push(1)
                                }}
                            />
                            <motion.div
                                variants={variants}
                                onUpdate={() => {
                                    updateDelayedBy(1)
                                    order.push(2)
                                }}
                            />
                        </motion.div>
                        <motion.div>
                            <motion.div
                                variants={variants}
                                onUpdate={() => {
                                    updateDelayedBy(2)
                                    order.push(3)
                                }}
                            />
                            <motion.div
                                variants={variants}
                                onUpdate={() => {
                                    updateDelayedBy(3)
                                    order.push(4)
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )
            }
        )

        expect(recordedOrder).toEqual([4, 3, 2, 1])
        expect(staggeredEqually).toEqual(true)
    })

    test("onUpdate", async () => {
        const promise = new Promise((resolve) => {
            let latest = {}

            const onUpdate = (l: { [key: string]: number | string }) => {
                latest = l
            }

            const Component = () => (
                <motion.div
                    onUpdate={onUpdate}
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: 100, y: 100 }}
                    transition={{ duration: 0.1 }}
                    onAnimationComplete={() => resolve(latest)}
                />
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toEqual({ x: 100, y: 100 })
    })

    test("onUpdate doesnt fire if no values have changed", async () => {
        const onUpdate = jest.fn()

        await new Promise<void>((resolve) => {
            const x = motionValue(0)
            const Component = ({ xTarget = 0 }) => (
                <motion.div
                    animate={{ x: xTarget }}
                    transition={{ type: false }}
                    onUpdate={onUpdate}
                    style={{ x }}
                />
            )

            const { rerender } = render(<Component xTarget={0} />)
            setTimeout(() => rerender(<Component xTarget={1} />), 30)
            setTimeout(() => rerender(<Component xTarget={1} />), 60)
            setTimeout(() => resolve(), 90)
        })

        expect(onUpdate).toHaveBeenCalledTimes(1)
    })

    test("accepts variants without being typed", () => {
        expect(() => {
            const variants = {
                withoutTransition: { opacity: 0 },
                withJustDefaultTransitionType: {
                    opacity: 0,
                    transition: {
                        duration: 1,
                    },
                },
                withTransitionIndividual: {
                    transition: {
                        when: "beforeChildren",
                        opacity: { type: "spring" },
                    },
                },
                withTransitionType: {
                    transition: {
                        type: "spring",
                    },
                },
                asResolver: () => ({
                    opacity: 0,
                    transition: {
                        type: "physics",
                        delay: 10,
                    },
                }),
                withTransitionEnd: {
                    transitionEnd: { opacity: 0 },
                },
            }
            render(<motion.div variants={variants} />)
        }).not.toThrowError()
    })

    test("new child items animate from initial to animate", () => {
        const x = motionValue(0)
        const Component = ({ length }: { length: number }) => {
            const variants: Variants = {
                hidden: { opacity: 0, x: -100, transition: { type: false } },
                visible: { opacity: 1, x: 100, transition: { type: false } },
            }

            const items = []
            for (let i = 0; i < length; i++) {
                items.push(
                    <motion.div
                        key={i}
                        variants={variants}
                        style={{ x: i === 1 ? x : 0 }}
                    />
                )
            }

            return (
                <motion.div initial="hidden" animate="visible">
                    <motion.div>{items}</motion.div>
                </motion.div>
            )
        }

        const { rerender } = render(<Component length={1} />)
        rerender(<Component length={1} />)
        rerender(<Component length={2} />)
        rerender(<Component length={2} />)

        expect(x.get()).toBe(100)
    })

    test("style is used as fallback when a variant is removed from animate", async () => {
        const Component = ({ animate }: { animate?: string }) => {
            return (
                <motion.div
                    animate={animate}
                    variants={{ a: { opacity: 1 } }}
                    transition={{ type: false }}
                    style={{ opacity: 0 }}
                />
            )
        }

        const { container, rerender } = render(<Component />)
        const element = container.firstChild as Element
        expect(element).toHaveStyle("opacity: 0")

        rerender(<Component animate="a" />)
        rerender(<Component animate="a" />)
        expect(element).toHaveStyle("opacity: 1")

        rerender(<Component />)
        rerender(<Component />)
        expect(element).toHaveStyle("opacity: 0")
    })

    test("style is used as fallback when a variant changes to not contain that style", async () => {
        const Component = ({ animate }: { animate?: string }) => {
            return (
                <motion.div
                    animate={animate}
                    variants={{ a: { opacity: 1 }, b: { x: 100 } }}
                    transition={{ type: false }}
                    style={{ opacity: 0 }}
                />
            )
        }

        const { container, rerender } = render(<Component />)
        const element = container.firstChild as Element
        expect(element).toHaveStyle("opacity: 0")

        rerender(<Component animate="a" />)
        rerender(<Component animate="a" />)
        expect(element).toHaveStyle("opacity: 1")

        rerender(<Component animate="b" />)
        rerender(<Component animate="b" />)
        expect(element).toHaveStyle("opacity: 0")
    })

    test("Children correctly animate to removed values even when not rendering along with parents", async () => {
        const Child = React.memo(() => (
            <motion.div
                variants={{
                    visible: { x: 100, opacity: 1 },
                    hidden: { opacity: 0 },
                }}
                transition={{ type: false }}
            />
        ))

        const Parent = ({ isVisible }: { isVisible: boolean }) => (
            <motion.div
                initial={{ x: 0 }}
                animate={isVisible ? "hidden" : "visible"}
            >
                <Child />
            </motion.div>
        )

        const { container, rerender } = render(<Parent isVisible={false} />)
        const element = container.firstChild?.firstChild as Element
        rerender(<Parent isVisible={true} />)
        expect(element).toHaveStyle(
            "transform: translateX(100px) translateZ(0)"
        )
        rerender(<Parent isVisible={false} />)
        expect(element).toHaveStyle("transform: none")
    })

    test("Protected keys don't persist after setActive fires", async () => {
        const Component = () => {
            const [isHover, setIsHover] = useState(false)
            const [_, setIsPressed] = useState(false)
            const [variant, setVariant] = useState("a")

            const variants = [variant]
            if (isHover) variants.push(variant + "-hover")

            return (
                <MotionConfig transition={{ type: false }}>
                    <motion.div
                        data-testid="parent"
                        animate={variants}
                        onHoverStart={() => setIsHover(true)}
                        onHoverEnd={() => setIsHover(false)}
                        onTapStart={() => setIsPressed(true)}
                        onTap={() => setIsPressed(false)}
                        onTapCancel={() => setIsPressed(false)}
                    >
                        <motion.div
                            data-testid="variant-trigger"
                            onTap={() => setVariant("b")}
                            style={{
                                width: 300,
                                height: 300,
                                backgroundColor: "rgb(255,255,0)",
                            }}
                            variants={{
                                b: {
                                    backgroundColor: "rgb(0,255,255)",
                                },
                            }}
                        >
                            <motion.div
                                data-testid="inner"
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: "rgb(255,255,0)",
                                }}
                                variants={{
                                    // This state lingers too long.
                                    "a-hover": {
                                        backgroundColor: "rgb(150,150,0)",
                                    },
                                    b: {
                                        backgroundColor: "rgb(0,255,255)",
                                    },
                                    "b-hover": {
                                        backgroundColor: "rgb(0, 150,150)",
                                    },
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </MotionConfig>
            )
        }

        const { getByTestId } = render(<Component />)
        const inner = getByTestId("inner")
        expect(inner).toHaveStyle("background-color: rgb(255,255,0)")

        pointerEnter(getByTestId("parent"))

        await nextFrame()
        await nextFrame()
        await nextFrame()

        expect(inner).toHaveStyle("background-color: rgb(150,150,0)")

        pointerDown(getByTestId("variant-trigger"))
        pointerUp(getByTestId("variant-trigger"))

        await nextFrame()
        await nextFrame()
        await nextFrame()

        expect(inner).toHaveStyle("background-color: rgb(0, 150,150)")
    })

    test("child onAnimationComplete triggers from parent animations", async () => {
        const variants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 100, transition: { type: false } },
        }

        const childVariants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 50, transition: { type: false } },
        }

        const promise = new Promise<string>((resolve) => {
            const onStart = (name: string) => resolve(name)
            const Component = () => (
                <motion.div animate="visible" variants={variants}>
                    <motion.div
                        variants={childVariants}
                        onAnimationStart={onStart}
                    />
                </motion.div>
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe("visible")
    })

    test("child onAnimationComplete triggers from parent animations", async () => {
        const variants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 100, transition: { type: false } },
        }

        const childVariants: Variants = {
            hidden: { opacity: 0, x: -100, transition: { type: false } },
            visible: { opacity: 1, x: 50, transition: { type: false } },
        }

        const promise = new Promise<string>((resolve) => {
            const onComplete = (name: string) => resolve(name)
            const Component = () => (
                <motion.div animate="visible" variants={variants}>
                    <motion.div
                        variants={childVariants}
                        onAnimationComplete={onComplete}
                    />
                </motion.div>
            )

            const { rerender } = render(<Component />)
            rerender(<Component />)
        })

        return expect(promise).resolves.toBe("visible")
    })
})