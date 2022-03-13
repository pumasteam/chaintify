import { useState, useEffect } from "react";
import useSWR from "swr";

/*
 * Hooks
 *
 * @param {string} url
 * @param {object} options
 * @returns {object}
 * @example
 * const { data, error } = useFetch('https://api.github.com/users/octocat');
 * if (error) return <div>failed to load</div>;
 * if (!data) return <div>loading...</div>;
 * return <div>{data.name}</div>;
 * @see https://www.npmjs.com/package/swr
 */

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useFetch = (url, options = {}) => {
  const { data, error } = useSWR(url, fetcher, options);
  return { data, error };
};

/*
 * Hooks
 *
 * @returns {boolean}
 * @example
 * const isMonetized = useMonetization();
 * if (isMonetized) return <div>monetized</div>;
 * return <div>not monetized</div>;
 */

const useMonetization = () => {
  const [isMonetized, setIsMonetized] = useState(false);

  useEffect(() => {
    const isMonetized = window.monetization ? true : false;
    setIsMonetized(isMonetized);
  }, []);

  return isMonetized;
};

export { useFetch, useMonetization };
