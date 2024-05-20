type UseDataProps<T> = {
    fn: () => Promise<T>;
    deps?: React.DependencyList | undefined;
    shouldRun?: boolean;
};

export type { UseDataProps };
